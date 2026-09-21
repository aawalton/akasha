import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

export type MusicRating = Grade

export const MUSIC_RATINGS = gradeProperty.values

const LIKED_FROM: MusicRating = "B-"

export const LIKED_RATINGS: ReadonlySet<MusicRating> = new Set<MusicRating>(
  MUSIC_RATINGS.slice(MUSIC_RATINGS.indexOf(LIKED_FROM))
)

export function isLiked(rating: MusicRating | undefined): boolean {
  return rating !== undefined && LIKED_RATINGS.has(rating)
}
