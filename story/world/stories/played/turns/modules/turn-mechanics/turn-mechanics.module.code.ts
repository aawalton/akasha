import {
  type BeatChange,
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

const EDITED = 2

const LONGEST_LINE = 100

const PARTED = "/"

const ISSUES_HELD = "txt"

export type Recorded = Extract<Handed, { readonly kind: "record" }>

export type Mechanicked =
  | { readonly refused: string }
  | {
      readonly values: Readonly<{ [key: string]: unknown }>
      readonly changes: readonly BeatChange[] | null
      readonly issues: readonly string[] | null
      readonly recordedBy: readonly string[]
      readonly next: "mechanics" | "game-master" | "on"
    }

function mostBeats(editorSteps: boolean | undefined): number {
  return editorSteps === true ? MOST_LINES * EDITED : MOST_LINES
}

export function linesRefused(
  one: string,
  lines: readonly string[],
  noun: Noun,
  most: number = MOST_LINES
): string | null {
  const what = `${one}s`
  if (lines.length > most) {
    return `a ${noun} holds at most ${most} ${what}, and this makes ${lines.length}`
  }
  const long = lines.flatMap((line, at) =>
    line.length > LONGEST_LINE ? [`${one} ${at + 1} runs to ${line.length}`] : []
  )
  if (long.length === 0) return null
  return `each of a ${noun}'s ${what} is at most ${LONGEST_LINE} characters, and ${long.join(", ")}`
}

export function beatsRefused(beats: readonly string[], held: Held): string | null {
  return linesRefused("beat", beats, held.noun ?? TURN, mostBeats(held.editorSteps))
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
  const all = mechanics.every((one) => recordedBy.includes(one))
  const back = all && issues.length > 0 && held.mechanicsSentBack !== true
  const values = {
    recordedBy: recordedBy.map((one) => `${storyRecorder.slug}${PARTED}${one}`),
    ...(issues.length === 0 ? {} : { mechanicsIssues: ISSUES_HELD }),
    ...(back ? { mechanicsSentBack: true } : {}),
  }
  const body = changes.length === 0 ? null : mergedOf(held.changes ?? [], changes)
  const issued = (handed.issues ?? []).length === 0 ? null : issues
  const next = !all ? "mechanics" : back ? "game-master" : "on"
  return { values, changes: body, issues: issued, recordedBy, next }
}
