import { outcomeLines } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { outcomesAt } from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import {
  marksRefused,
  owedIn,
  unmarkedIn,
} from "akasha/command/pages/story/turn/modules/turn-outcome-marks/turn-outcome-marks.module.code.ts"
import {
  type BeatChange,
  mergedOf,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

type Refused = { readonly refused: string }

export type Settled = { readonly at: string | null; readonly text: string | null }

export type Settling = {
  readonly present: (path: string) => boolean
  readonly textOf: (path: string) => string
}

function replacedRefused(was: string, now: string): string | null {
  const had = outcomeLines(was).length
  const has = outcomeLines(now).length
  if (had === has) return null
  return `the outcomes handed in hold ${has} lines, and the turn's hold ${had}, and a correction replaces each line in its place`
}

export function outcomesOn(
  reading: Settling,
  turnAt: string,
  handed: string | null,
  beats: Beats,
  beat: number,
  now: readonly BeatChange[]
): Settled | Refused {
  const at = outcomesAt(turnAt)
  const there = at !== null && reading.present(at)
  if (handed !== null && !there) {
    return { refused: `\`${turnAt}\` has no outcomes file for outcome lines to replace` }
  }
  if (at === null || !there) return { at: null, text: null }
  const was = reading.textOf(at)
  const wrong = handed === null ? null : replacedRefused(was, handed)
  if (wrong !== null) return { refused: wrong }
  const text = handed ?? was
  const owed = owedIn(text)
  const unmarked = unmarkedIn(owed, now)
  if (unmarked !== null) return { refused: unmarked }
  const old = beats.changes.filter((one) => one.beat === beat)
  const lines = new Set(
    [...old, ...now].flatMap((one) => (one.outcome === undefined ? [] : [one.outcome]))
  )
  const all = mergedOf(
    beats.changes.filter((one) => one.beat !== beat),
    now
  )
  const marked = marksRefused(
    owed.filter((one) => lines.has(one.line)),
    all
  )
  if (marked !== null) return { refused: marked }
  return { at, text: handed === null || handed === was ? null : handed }
}
