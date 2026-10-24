import { readOwnTranscriptTail } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { lastReplyIn, type Reply } from "akasha/agent/modules/last-said/last-said.module.code.ts"
import {
  personsOf,
  principalStatedIn,
} from "akasha/agent/seat/declaration/modules/seat-persons/seat-persons.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { workingOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import type { HeartbeatPoll } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { notify } from "akasha/alan/harness/notification-feed/modules/notifying/notifying.module.code.ts"
import type { NotifyInput } from "akasha/alan/harness/notification-feed/modules/rows/notification-feed-rows.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const POLL_NAME = "reply-notify"

const SEAT = "seat"

const ROLE = "role"

const PERSONS = "persons"

const KIND = "seat-reply"

const EXCERPT_LENGTH = 180

const TAIL_BYTES = 262_144

const SEVERAL = 2

interface ReplySeat {
  readonly id: string
  readonly slug: string
  readonly role: string | null
  readonly persons: readonly string[]
}

function seatOf(agentId: string): ReplySeat | null {
  const slug = seatNameForAgent(agentId)
  if (slug === null) return null
  const value = valuedAt(akashaRoot(), SEAT, slug).value
  const role = textAt(value, ROLE)
  const principal = principalStatedIn(value[PERSONS])
  return {
    id: agentId,
    slug,
    role: role === null ? null : slugOf(role),
    persons: principal === null ? [] : personsOf(principal),
  }
}

function idleOf(agentId: string): boolean {
  return workingOf(agentId).activeTurn === false
}

function replyOf(agentId: string): Reply | null {
  const tail = readOwnTranscriptTail(agentId, TAIL_BYTES)
  return tail === null ? null : lastReplyIn(tail)
}

function titleOf(seat: ReplySeat): string {
  const words = (seat.role ?? seat.slug).replaceAll("-", " ")
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`
}

function excerptOf(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim()
  if (flat.length <= EXCERPT_LENGTH) return flat
  return `${flat.slice(0, EXCERPT_LENGTH - 1).trimEnd()}…`
}

function notificationOf(seat: ReplySeat, reply: Reply): NotifyInput {
  return {
    title: titleOf(seat),
    body: excerptOf(reply.text),
    link: buildPageHref({
      pageTypeSlug: toPageTypeSlug(SEAT),
      slug: seat.slug,
      fallbackSlugSource: null,
      id: seat.id,
    }),
    kind: KIND,
    source: seat.slug,
  }
}

export function replyNotifyPoll(args: {
  getAgentId: () => string | null
  log: (line: string) => void
  readSeat?: (agentId: string) => ReplySeat | null
  readIdle?: (agentId: string) => boolean
  readReply?: (agentId: string) => Reply | null
  send?: (person: string, input: NotifyInput) => Promise<void>
}): HeartbeatPoll {
  const readSeat = args.readSeat ?? seatOf
  const readIdle = args.readIdle ?? idleOf
  const readReply = args.readReply ?? replyOf
  const send = args.send ?? notify
  let seen: string | null | undefined
  let beatInFlight = false

  const sent = async (seat: ReplySeat, reply: Reply): Promise<void> => {
    const input = notificationOf(seat, reply)
    for (const person of seat.persons) {
      try {
        await send(person, input)
      } catch (err) {
        args.log(`${POLL_NAME}: ${seat.slug}'s reply did not reach ${person}: ${String(err)}`)
      }
    }
    args.log(`${POLL_NAME}: ${seat.slug}'s reply ${reply.id} sent to ${seat.persons.join(", ")}`)
  }

  const beat = async (): Promise<void> => {
    if (beatInFlight) return
    beatInFlight = true
    try {
      const agentId = args.getAgentId()
      if (agentId === null) {
        seen = undefined
        return
      }
      const seat = readSeat(agentId)
      if (seat === null || seat.persons.length < SEVERAL) return
      if (seen === undefined) {
        seen = readReply(agentId)?.id ?? null
        return
      }
      if (!readIdle(agentId)) return
      const reply = readReply(agentId)
      if (reply === null || reply.id === seen) return
      seen = reply.id
      await sent(seat, reply)
    } finally {
      beatInFlight = false
    }
  }

  return { name: POLL_NAME, run: beat }
}
