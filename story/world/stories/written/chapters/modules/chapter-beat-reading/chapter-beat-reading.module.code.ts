import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type Beats,
  beatsIn,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { playedClockOf } from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"

export function chapterClockOf(beatsText: string | null): string | null {
  if (beatsText === null) return null
  const read = beatsIn(beatsText)
  if ("refused" in read) return null
  const at = read.scenes.findLast((one) => one.at !== undefined)?.at
  return at === undefined ? null : playedClockOf([asPage({ id: "", icon: null, endsAt: at })])
}

export function beatsOf(beatsText: string | null): Beats | null {
  if (beatsText === null) return null
  const read = beatsIn(beatsText)
  return "refused" in read ? null : read
}

export function beatClockOf(beats: Beats, beat: number): string | null {
  const at = beats.scenes.findLast((one) => one.beat <= beat && one.at !== undefined)?.at
  return at === undefined ? null : playedClockOf([asPage({ id: "", icon: null, endsAt: at })])
}
