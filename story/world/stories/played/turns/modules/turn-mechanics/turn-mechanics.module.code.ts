import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"
import {
  type BeatChange,
  mergedOf,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import {
  CHAPTER,
  type Handed,
  type Held,
  type Noun,
  type Ruling,
  TURN,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const MOST_LINES = 100

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

function mostLines(noun: Noun): number | null {
  return noun === CHAPTER ? MOST_LINES : null
}

function linesRefused(
  one: string,
  lines: readonly string[],
  noun: Noun,
  most: number | null
): string | null {
  const what = `${one}s`
  if (most !== null && lines.length > most) {
    return `a ${noun} holds at most ${most} ${what}, and this makes ${lines.length}`
  }
  const long = lines.flatMap((line, at) =>
    line.length > LONGEST_LINE ? [`${one} ${at + 1} runs to ${line.length}`] : []
  )
  if (long.length === 0) return null
  return `each of a ${noun}'s ${what} is at most ${LONGEST_LINE} characters, and ${long.join(", ")}`
}

export function issuesRefused(issues: readonly string[], noun: Noun): string | null {
  return linesRefused("issue", issues, noun, mostLines(noun))
}

export function beatsRefused(beats: readonly string[], held: Held): string | null {
  const noun = held.noun ?? TURN
  return linesRefused("beat", beats, noun, mostLines(noun))
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
  const raised = unruled(handed.issues ?? [], held.rulings ?? [])
  const issues = [...(held.mechanicsIssues ?? []), ...raised]
  const long = issuesRefused(issues, noun)
  if (long !== null) return { refused: long }
  const recordedBy = [...held.recordedBy, handed.recorder]
  const all = mechanics.every((one) => recordedBy.includes(one))
  const back = all && issues.length > 0
  const values = {
    recordedBy: recordedBy.map((one) => `${storyRecorder.slug}${PARTED}${one}`),
    ...(issues.length === 0 ? {} : { mechanicsIssues: ISSUES_HELD }),
  }
  const body = changes.length === 0 ? null : changesMerged(held.changes ?? [], changes)
  const issued = raised.length === 0 ? null : issues
  const next = !all ? "mechanics" : back ? "game-master" : "on"
  return { values, changes: body, issues: issued, recordedBy, next }
}

function appendedOver(held: BeatChange, more: BeatChange): boolean {
  if (held.append === undefined || more.append === undefined) return false
  return held.beat === more.beat && held.page === more.page && held.key === more.key
}

export function changesMerged(
  had: readonly BeatChange[],
  more: readonly BeatChange[]
): readonly BeatChange[] {
  const kept = had.filter((one) => !more.some((two) => jsonEqual(one, two)))
  const added = more.filter((two) => !kept.some((one) => appendedOver(one, two)))
  return mergedOf(kept, added)
}

const RAISED = ": "

export function raisedAs(reviewer: string, issue: string): string {
  return `${reviewer}${RAISED}${issue}`
}

export function raiserOf(line: string, reviewers: readonly string[]): string | null {
  return reviewers.find((one) => line.startsWith(`${one}${RAISED}`)) ?? null
}

export function issueOf(line: string, reviewers: readonly string[]): string {
  const by = raiserOf(line, reviewers)
  return by === null ? line : line.slice(by.length + RAISED.length)
}

export function ruledOut(line: string, rulings: readonly Ruling[]): boolean {
  return rulings.some((one) => one.issue === line)
}

export function unruled(lines: readonly string[], rulings: readonly Ruling[]): readonly string[] {
  return lines.filter((one) => !ruledOut(one, rulings))
}

const RULING_KEYS: readonly string[] = ["issue", "reason"]

function rulingOf(line: string): Ruling | string {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return "is no json object"
  }
  if (typeof held !== "object" || held === null || Array.isArray(held)) return "is no json object"
  const record = held as Readonly<{ [key: string]: unknown }>
  const stray = Object.keys(record).find((key) => !RULING_KEYS.includes(key))
  if (stray !== undefined) return `states \`${stray}\`, and a ruling states issue and reason`
  const issue = record["issue"]
  const reason = record["reason"]
  if (typeof issue !== "string" || issue.trim() === "") return "names no issue"
  if (typeof reason !== "string" || reason.trim() === "" || reason.length > LONGEST_LINE) {
    return `states no reason of 1 to ${LONGEST_LINE} characters`
  }
  return { issue: issue.trim(), reason: reason.trim() }
}

export function rulingsIn(
  lines: readonly string[]
): readonly Ruling[] | { readonly refused: string } {
  const rulings: Ruling[] = []
  for (const [index, line] of lines.entries()) {
    const one = rulingOf(line)
    if (typeof one === "string") return { refused: `ruling ${index + 1} ${one}` }
    rulings.push(one)
  }
  return rulings
}

export function rulingsJoined(had: readonly Ruling[], more: readonly Ruling[]): readonly Ruling[] {
  return [...had, ...more.filter((one) => !ruledOut(one.issue, had))]
}
