import {
  heard,
  type Picked,
  pickingOver,
} from "akasha/alan/music/choosing/modules/track-picking/track-picking.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export function unheard(track: Value): boolean {
  return !heard(track)
}

export function pickingUnheard(
  tracks: readonly Value[],
  releases: readonly Value[],
  followed: ReadonlySet<string>
): readonly Picked[] {
  return pickingOver(tracks, releases, followed, unheard)
}
