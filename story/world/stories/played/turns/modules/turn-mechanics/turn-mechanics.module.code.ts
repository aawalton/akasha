import {
  linesOf,
  mergedOf,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import {
  type Handed,
  type Held,
  type Noun,
  TURN,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const MOST_LINES = 100

const LONGEST_LINE = 100

const CHANGES_HELD = "jsonl"

const PARTED = "/"

export type Recorded = Extract<Handed, { readonly kind: "record" }>

export type Mechanicked =
  | { readonly refused: string }
  | {
      readonly values: Readonly<{ [key: string]: unknown }>
      readonly changes: string | null
      readonly recordedBy: readonly string[]
      readonly next: "mechanics" | "game-master" | "on"
    }

export function linesRefused(one: string, lines: readonly string[], noun: Noun): string | null {
  const what = `${one}s`
  if (lines.length > MOST_LINES) {
    return `a ${noun} holds at most ${MOST_LINES} ${what}, and this makes ${lines.length}`
  }
  const long = lines.flatMap((line, at) =>
    line.length > LONGEST_LINE ? [`${one} ${at + 1} runs to ${line.length}`] : []
  )
  if (long.length === 0) return null
  return `each of a ${noun}'s ${what} is at most ${LONGEST_LINE} characters, and ${long.join(", ")}`
}

export function mechanicked(
  held: Held,
  handed: Recorded,
  mechanics: readonly string[]
): Mechanicked {
  const noun = held.noun ?? TURN
  const changes = handed.changes ?? []
  const beats = held.beats ?? Number.POSITIVE_INFINITY
  const far = changes.find((one) => one.beat > beats)
  if (far !== undefined) {
    return { refused: `a change names beat ${far.beat}, and the ${noun} has ${beats} beats` }
  }
  const issues = [...(held.mechanicsIssues ?? []), ...(handed.issues ?? [])]
  const long = linesRefused("issue", issues, noun)
  if (long !== null) return { refused: long }
  const recordedBy = [...held.recordedBy, handed.recorder]
  const values = {
    recordedBy: recordedBy.map((one) => `${storyRecorder.slug}${PARTED}${one}`),
    ...(changes.length === 0 ? {} : { beatChanges: CHANGES_HELD }),
    ...(issues.length === 0 ? {} : { mechanicsIssues: issues }),
  }
  const body = changes.length === 0 ? null : linesOf(mergedOf(held.changes ?? [], changes))
  const all = mechanics.every((one) => recordedBy.includes(one))
  const next = !all ? "mechanics" : issues.length > 0 ? "game-master" : "on"
  return { values, changes: body, recordedBy, next }
}
