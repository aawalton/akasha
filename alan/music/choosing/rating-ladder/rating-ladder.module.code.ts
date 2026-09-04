import type { Rung } from "@akasha/pages-system/rank-property"

export type MusicRating = Rung

export const MUSIC_RATINGS = [
  "F",
  "D-",
  "D",
  "D+",
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S",
  "S+",
] as const satisfies readonly Rung[]

const LIKED_FROM: MusicRating = "B-"

export const LIKED_RATINGS: ReadonlySet<MusicRating> = new Set<MusicRating>(
  MUSIC_RATINGS.slice(MUSIC_RATINGS.indexOf(LIKED_FROM))
)

export function ratingRung(rating: MusicRating | undefined): number {
  return rating === undefined ? -1 : MUSIC_RATINGS.indexOf(rating)
}

export function isLiked(rating: MusicRating | undefined): boolean {
  return rating !== undefined && LIKED_RATINGS.has(rating)
}
