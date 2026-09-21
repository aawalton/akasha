import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

const LIKED_FROM: Grade = "B-"

export const LIKED_RATINGS: ReadonlySet<Grade> = new Set<Grade>(
  gradeProperty.values.slice(gradeProperty.values.indexOf(LIKED_FROM))
)

export function isLiked(grade: Grade | undefined): boolean {
  return grade !== undefined && LIKED_RATINGS.has(grade)
}
