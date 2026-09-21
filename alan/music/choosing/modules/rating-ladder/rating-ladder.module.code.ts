import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

export type MusicRating = Grade

const LIKED_FROM: MusicRating = "B-"

export const LIKED_RATINGS: ReadonlySet<MusicRating> = new Set<MusicRating>(
  gradeProperty.values.slice(gradeProperty.values.indexOf(LIKED_FROM))
)

export function isLiked(rating: MusicRating | undefined): boolean {
  return rating !== undefined && LIKED_RATINGS.has(rating)
}
