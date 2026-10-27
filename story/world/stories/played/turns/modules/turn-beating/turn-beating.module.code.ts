import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  doneBy,
  type FlowPart,
  readyAcross,
  readyFor,
  shownThrough,
} from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import {
  type BeatProse,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { mechanics } from "akasha/story/recorder/pages/mechanics.story-recorder.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { picture } from "akasha/story/recorder/pages/picture.story-recorder.ts"
import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Advanced,
  BEATS,
  type Caller,
  type Handed,
  type Held,
  moved,
  PLAYER,
  published,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { proseTaken } from "akasha/story/world/stories/played/turns/modules/turn-prose/turn-prose.module.code.ts"

type Listed = "changes" | "memory" | "pictured"

const STEPPED: readonly FlowPart[] = ["changes", "prose", "memory", "pictured"]

const RECORDED: Readonly<{ [recorder: string]: Listed }> = {
  [mechanics.slug]: "changes",
  [memory.slug]: "memory",
  [picture.slug]: "pictured",
}

const STEP_OF: Readonly<{ [part in FlowPart]: string }> = {
  event: "the game master",
  changes: `the \`${mechanics.slug}\` recorder`,
  prose: "the writer",
  memory: `the \`${memory.slug}\` recorder`,
  pictured: `the \`${picture.slug}\` recorder`,
}

type Refused = { readonly refused: string }

type Part = { readonly part: FlowPart; readonly role: string }

function partOf(handed: Handed): Part | Refused {
  if (handed.kind === "prose") return { part: "prose", role: writerRole.slug }
  if (handed.kind !== "record") {
    return {
      refused: `at ${BEATS} an advance hands in one beat's numbers, prose, memory or pictures`,
    }
  }
  const part = RECORDED[handed.recorder]
  if (part !== undefined) return { part, role: storyRecorderRole.slug }
  const named = Object.keys(RECORDED).join(", ")
  return {
    refused: `\`${handed.recorder}\` takes no part of a beat, and those that do are ${named}`,
  }
}

function readyRefused(flow: Beats, part: FlowPart, beat: number | undefined): string | null {
  if (beat === undefined) return `at ${BEATS} an advance names the beat it hands in at \`--beat\``
  const ready = readyFor(flow, part)
  const step = STEP_OF[part]
  if (ready === null) return `no beat is ready for ${step} yet, and this hands in beat ${beat}`
  if (ready !== beat)
    return `beat ${ready} is the beat ready for ${step}, and this hands in beat ${beat}`
  return null
}

function listedWith<Entry extends { readonly beat: number }>(
  had: readonly Entry[],
  more: readonly Entry[],
  beat: number,
  what: string
): readonly Entry[] | Refused {
  const stray = more.find((one) => one.beat !== beat)
  if (stray !== undefined) {
    return { refused: `a ${what} names beat ${stray.beat}, and this hands in beat ${beat}` }
  }
  return [...had, ...more]
}

function noneWith(flow: Beats, beat: number, part: Listed): Beats {
  return { ...flow, none: [...(flow.none ?? []), { beat, part }] }
}

function recordedOn(flow: Beats, beat: number, part: Listed, handed: Handed): Beats | Refused {
  if (handed.kind !== "record") return flow
  if ((handed.issues ?? []).length > 0) {
    return { refused: `issues on a beat are not taken at ${BEATS}` }
  }
  if (part === "changes") {
    const more = handed.changes ?? []
    if (more.length === 0) return noneWith(flow, beat, part)
    const changes = listedWith(flow.changes, more, beat, "change")
    return "refused" in changes ? changes : { ...flow, changes }
  }
  if (part === "memory") {
    const more = handed.memory ?? []
    if (more.length === 0) return noneWith(flow, beat, part)
    const listed = listedWith(flow.memory, more, beat, "memory")
    return "refused" in listed ? listed : { ...flow, memory: listed }
  }
  const more = handed.pictured ?? []
  if (more.length === 0) return noneWith(flow, beat, part)
  const pictured = listedWith(flow.pictured ?? [], more, beat, "picture")
  return "refused" in pictured ? pictured : { ...flow, pictured }
}

function toldOf(handed: Extract<Handed, { kind: "prose" }>, beat: number): BeatProse | Refused {
  const records = handed.beatProse ?? []
  if (records.length > 1) return { refused: `a writer hands in one beat's prose at ${BEATS}` }
  const record = records[0]
  if (record === undefined) return { beat, prose: handed.prose.trim() }
  if (record.beat !== beat) {
    return { refused: `the prose names beat ${record.beat}, and this hands in beat ${beat}` }
  }
  return record
}

type Telling = {
  readonly cast: readonly Character[]
  readonly admitted: Admitted
}

function proseOn(
  held: Held,
  flow: Beats,
  handed: Extract<Handed, { kind: "prose" }>,
  beat: number,
  telling: Telling
):
  | {
      readonly flow: Beats
      readonly prose: string
      readonly values: Readonly<{ [key: string]: unknown }>
    }
  | Refused {
  const told = toldOf(handed, beat)
  if ("refused" in told) return told
  const prose = [...(flow.prose ?? []), told]
  const whole = proseWritten(prose)
  const characters = [...new Set([...(held.characters ?? []), ...handed.characters])]
  const taken = proseTaken(whole, characters, telling.cast, telling.admitted)
  if ("refused" in taken) return taken
  return { flow: { ...flow, prose }, prose: taken.prose, values: taken.values }
}

export function beatRouted(
  held: Held,
  caller: Caller,
  handed: Handed,
  cast: readonly Character[],
  admitted: Admitted
): Advanced | null {
  if (held.status === BEATS && held.roleplayed !== true) {
    return fromBeat(held, caller, handed, cast, admitted)
  }
  const beat = handed.kind === "prose" || handed.kind === "record" ? handed.beat : undefined
  if (beat === undefined) return null
  return { refused: `\`--beat\` names a beat only while a turn is at ${BEATS}` }
}

function fromBeat(
  held: Held,
  caller: Caller,
  handed: Handed,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  const flow = held.flow
  if (flow === undefined) return { refused: `the turn at ${BEATS} has no beats file to read` }
  const found = partOf(handed)
  if ("refused" in found) return found
  if (caller.role !== found.role) {
    return { refused: `${STEP_OF[found.part]} hands in this part, from a ${found.role} seat` }
  }
  const beat = handed.kind === "prose" || handed.kind === "record" ? handed.beat : undefined
  const unready = readyRefused(flow, found.part, beat)
  if (unready !== null || beat === undefined) return { refused: unready ?? "" }
  if (handed.kind === "prose") {
    const told = proseOn(held, flow, handed, beat, { cast, admitted })
    if ("refused" in told) return told
    return onward(told.flow, told.values, told.prose, false)
  }
  const part = found.part === "prose" || found.part === "event" ? null : found.part
  if (part === null) return { refused: `${STEP_OF[found.part]} hands in no list` }
  const after = recordedOn(flow, beat, part, handed)
  if ("refused" in after) return after
  return onward(after, {}, null, true)
}

export type BeatJob = { readonly part: FlowPart; readonly turn: number; readonly beat: number }

export function beatJobsOf(before: readonly Beats[], after: readonly Beats[]): readonly BeatJob[] {
  return STEPPED.flatMap((part) => {
    const now = readyAcross(after, part)
    if (now === null) return []
    const was = readyAcross(before, part)
    const same = was !== null && was.turn === now.turn && was.beat === now.beat
    return same ? [] : [{ part, ...now }]
  })
}

export function recorderOf(part: FlowPart): string | null {
  return Object.entries(RECORDED).find(([, listed]) => listed === part)?.[0] ?? null
}

export function changesUnshown(held: Held): readonly BeatChange[] {
  const flow = held.flow
  if (held.status !== BEATS || flow === undefined) return held.changes ?? []
  const shown = shownThrough(flow)
  return flow.changes.filter((one) => one.beat > shown)
}

export function changesShown(
  held: Held,
  status: TurnStep,
  after: Beats | null
): readonly BeatChange[] {
  const before = held.flow
  if (held.status !== BEATS || before === undefined) {
    return status === PLAYER ? (held.changes ?? []) : []
  }
  if (after === null) return []
  const from = shownThrough(before)
  const to = shownThrough(after)
  return after.changes.filter((one) => one.beat > from && one.beat <= to)
}

function onward(
  flow: Beats,
  values: Readonly<{ [key: string]: unknown }>,
  prose: string | null,
  landsKept: boolean
): Advanced {
  const done = STEPPED.every((part) => doneBy(flow, part))
  const moving = { flow, prose, landsKept }
  return done ? moved(PLAYER, published(values), moving) : moved(BEATS, values, moving)
}
