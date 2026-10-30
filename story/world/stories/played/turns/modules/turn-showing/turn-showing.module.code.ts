import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { shownThrough } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  BEATS,
  type Held,
  PLAYER,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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
    return status === PLAYER && held.status !== PLAYER ? (held.changes ?? []) : []
  }
  if (after === null) return []
  const from = shownThrough(before)
  const to = shownThrough(after)
  return after.changes.filter((one) => one.beat > from && one.beat <= to)
}
