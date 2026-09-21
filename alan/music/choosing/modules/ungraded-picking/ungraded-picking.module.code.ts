import {
  heard,
  type Picked,
  pickingOver,
} from "akasha/alan/music/choosing/modules/track-picking/track-picking.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const RANK = "rank"

export function graded(track: Value): boolean {
  return textIn(track, RANK) !== null
}

export function ungraded(track: Value): boolean {
  return heard(track) && !graded(track)
}

export function pickingUngraded(
  tracks: readonly Value[],
  releases: readonly Value[],
  followed: ReadonlySet<string>
): readonly Picked[] {
  return pickingOver(tracks, releases, followed, ungraded)
}
