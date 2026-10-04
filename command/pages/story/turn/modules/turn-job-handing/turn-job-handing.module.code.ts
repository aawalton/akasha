import { writeMessage } from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { liveSessionHolds } from "akasha/agent/seat/launching/modules/launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { SEAT_MODE_INTERACTIVE } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { startSeat } from "akasha/agent/seat/launching/modules/seat-start/seat-start.module.code.ts"
import { akashaSeatIdForName } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { composeSeatName } from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { agentPresence } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import {
  seatTargetOrBack,
  tookAway,
} from "akasha/agent/seat/reviving/modules/seat-coming-back/seat-coming-back.module.code.ts"
import { resumeSeat } from "akasha/agent/seat/reviving/modules/seat-resume/seat-resume.module.code.ts"
import { akashaHere } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { ACTION_BAR_PLAYER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { JOB_SENDER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ANNOUNCE = "announce" as const

export type Starting = {
  readonly persona: string
  readonly role: string
  readonly game: string
  readonly flex: string | null
  readonly prompt: string
}

export type Handing = "started" | "resumed" | "sent"

export type Handed = { readonly how: Handing; readonly name: string }

export type Seating = {
  readonly nameOf: (starting: Starting) => string | null
  readonly liveAs: (name: string) => string | null
  readonly up: (agentId: string) => boolean
  readonly held: (name: string) => Promise<boolean>
  readonly wentAway: (name: string) => boolean
  readonly start: (starting: Starting, done: string[]) => Promise<string>
  readonly send: (name: string, body: string) => Promise<string | null>
  readonly resume: (name: string, prompt: string, done: string[]) => Promise<undefined>
}

function nameOf(starting: Starting): string | null {
  return composeSeatName(
    {
      attributes: { persona: starting.persona, domain: starting.game, role: starting.role },
      flex: starting.flex,
      principal: ACTION_BAR_PLAYER,
    },
    akashaHere()
  )
}

async function startedFresh(starting: Starting, done: string[]): Promise<string> {
  const started = await startSeat(
    {
      startMode: SEAT_MODE_INTERACTIVE,
      persona: starting.persona,
      role: starting.role,
      domain: starting.game,
      principal: ACTION_BAR_PLAYER,
      ...(starting.flex === null ? {} : { flex: starting.flex }),
      prompt: starting.prompt,
      parent: null,
    },
    done
  )
  return started.name
}

async function jobSent(name: string, body: string): Promise<string | null> {
  const wrote = await writeMessage({
    to: name,
    from: JOB_SENDER,
    warrant: ANNOUNCE,
    body,
    startedOnDemand: true,
  })
  return wrote.kind === "refused" ? wrote.detail : null
}

async function resumedOn(name: string, prompt: string, done: string[]): Promise<undefined> {
  const agentId = await seatTargetOrBack(name, done)
  await resumeSeat({ agentId, prompt, selfAgentId: null }, done)
  return undefined
}

const SEATING: Seating = {
  nameOf,
  liveAs: akashaSeatIdForName,
  up: (agentId) => agentPresence(agentId) !== "absent",
  held: liveSessionHolds,
  wentAway: (name) => tookAway(akashaHere(), name) !== null,
  start: startedFresh,
  send: jobSent,
  resume: resumedOn,
}

async function sentTo(seating: Seating, name: string, body: string): Promise<Handed> {
  const why = await seating.send(name, body)
  if (why !== null) throw new Error(`\`${name}\` is up, and its job was not sent to it: ${why}`)
  return { how: "sent", name }
}

async function resumedAs(
  seating: Seating,
  starting: Starting,
  name: string,
  done: string[]
): Promise<Handed> {
  try {
    await seating.resume(name, starting.prompt, done)
  } catch (thrown) {
    if (await seating.held(name)) return await sentTo(seating, name, starting.prompt)
    throw thrown
  }
  return { how: "resumed", name }
}

export async function jobHanded(
  starting: Starting,
  done: string[],
  seating: Seating = SEATING
): Promise<Handed> {
  const name = seating.nameOf(starting)
  if (name === null) return { how: "started", name: await seating.start(starting, done) }
  const id = seating.liveAs(name)
  const up = id !== null && seating.up(id)
  if (up || (await seating.held(name))) return await sentTo(seating, name, starting.prompt)
  if (id !== null || seating.wentAway(name)) return await resumedAs(seating, starting, name, done)
  return { how: "started", name: await seating.start(starting, done) }
}
