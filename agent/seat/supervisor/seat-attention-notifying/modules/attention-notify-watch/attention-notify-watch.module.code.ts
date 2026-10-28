import { appendFileSync } from "node:fs"
import { join } from "node:path"
import {
  PERSONAS,
  seatSectionOf,
} from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"
import { byDesktop } from "akasha/agent/seat/modules/notice-choosing/seat-notice-choosing.module.code.ts"
import type { SeatTurnState } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { seatTurnStateOf } from "akasha/agent/seat/observation/seat-turn/modules/state/seat-turn-state.module.code.ts"
import {
  excerptOf,
  noticeOf,
  replyOf,
  seatOf,
  titleOf,
} from "akasha/agent/seat/supervisor/seat-reply-notifying/modules/reply-notify-poll/reply-notify-poll.module.code.ts"
import {
  runtimeRootDir,
  supervisorsRootDir,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import { editorFocused } from "akasha/code/editor/extension/modules/editor-focus/editor-focus.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const WATCH_NAME = "attention-notify"

const WATCH_MS = 3_000

const SETTLE_MS = 12_000

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const RED: SeatTurnState = "needs-attention"

const YELLOW: SeatTurnState = "idle"

const WORKING: SeatTurnState = "working"

const APP_NAME = "Akasha"

const RECORD_AT = "attention-notify.log"

export interface AttentionSeat {
  readonly title: string
  readonly persona: boolean
  readonly desktop: boolean
}

export interface Shown {
  readonly title: string
  readonly body: string
}

function attentionSeatOf(agentId: string): AttentionSeat | null {
  const seat = seatOf(agentId)
  if (seat === null) return null
  const assignment = textAt(valuedAt(akashaRoot(), SEAT, seat.slug).value, ASSIGNMENT)
  return {
    title: titleOf(seat),
    persona: seatSectionOf(seat.role, assignment) === PERSONAS,
    desktop: seat.persons.some((person) => byDesktop(noticeOf(person, seat.id))),
  }
}

function excerptIn(agentId: string): string {
  const reply = replyOf(agentId)
  return reply === null ? "" : excerptOf(reply.text)
}

function recordedFor(agentId: string, line: string): undefined {
  try {
    const at = join(supervisorsRootDir(), agentId, RECORD_AT)
    appendFileSync(at, `${new Date().toISOString()} ${line}\n`)
  } catch {}
  return undefined
}

async function shownOnDesktop(agentId: string, note: Shown): Promise<undefined> {
  const bus = process.env.DBUS_SESSION_BUS_ADDRESS ?? `unix:path=${runtimeRootDir()}/bus`
  try {
    const sent = Bun.spawn(["notify-send", `--app-name=${APP_NAME}`, note.title, note.body], {
      env: { ...process.env, DBUS_SESSION_BUS_ADDRESS: bus },
      stdout: "ignore",
      stderr: "pipe",
    })
    const code = await sent.exited
    const said = (await new Response(sent.stderr).text()).trim()
    recordedFor(agentId, `shown "${note.title}" exit=${code}${said === "" ? "" : ` ${said}`}`)
  } catch (err) {
    recordedFor(agentId, `not shown "${note.title}": ${String(err)}`)
  }
  return undefined
}

function headlineOf(title: string, state: SeatTurnState): string {
  return state === RED ? `${title} needs you` : `${title} is done`
}

export function attentionWatch(args: {
  readState: (agentId: string) => SeatTurnState
  readSeat: (agentId: string) => AttentionSeat | null
  readExcerpt: (agentId: string) => string
  readFocused: () => boolean
  show: (agentId: string, note: Shown) => undefined
  held: (agentId: string, note: Shown) => undefined
  now: () => number
}): (agentId: string | null) => undefined {
  let found = false
  let endedAt: number | null = null
  let told: SeatTurnState | null = null

  return (agentId) => {
    if (agentId === null) {
      found = false
      return undefined
    }
    const state = args.readState(agentId)
    if (state === WORKING) {
      found = true
      endedAt = null
      told = null
      return undefined
    }
    if (!found) {
      found = true
      endedAt = args.now()
      told = RED
      return undefined
    }
    if (endedAt === null) endedAt = args.now()
    const settled = args.now() - endedAt >= SETTLE_MS
    const due = state === RED ? told !== RED : state === YELLOW && told === null && settled
    if (!due) return undefined
    told = state
    const seat = args.readSeat(agentId)
    if (seat === null || !seat.persona || !seat.desktop) return undefined
    const note = { title: headlineOf(seat.title, state), body: args.readExcerpt(agentId) }
    if (args.readFocused()) return args.held(agentId, note)
    return args.show(agentId, note)
  }
}

export function startAttentionNotifyWatch(args: {
  getAgentId: () => string | null
  log: (line: string) => void
}): { stop: () => void } {
  const watched = attentionWatch({
    readState: (agentId) => seatTurnStateOf(agentId).state,
    readSeat: attentionSeatOf,
    readExcerpt: excerptIn,
    readFocused: () => editorFocused(),
    show: (agentId, note) => {
      void shownOnDesktop(agentId, note)
      return undefined
    },
    held: (agentId, note) => recordedFor(agentId, `held "${note.title}": the editor has focus`),
    now: Date.now,
  })
  const timer = setInterval(() => {
    try {
      watched(args.getAgentId())
    } catch (err) {
      args.log(`${WATCH_NAME}: ${String(err)}`)
    }
  }, WATCH_MS)
  return { stop: () => clearInterval(timer) }
}
