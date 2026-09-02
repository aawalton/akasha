import type { Rating } from "../../catalog/properties/rating.text-property.ts"

export type MusicRating = Rating

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
] as const satisfies readonly Rating[]

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
