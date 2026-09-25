import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

export const LITRPG_RATINGS = gradeProperty.values
export type LitrpgRating = Grade

export interface LitrpgStory {
  readonly id: string
  readonly title: string
  readonly genres: readonly string[]
  readonly grade?: LitrpgRating
  readonly status?: string
  readonly progress?: number
  readonly length?: number
  readonly chapterCount?: number
}

export interface LitrpgChapter {
  readonly id: string
  readonly title: string
  readonly storyId: string
  readonly pageTypeSlug?: string
  readonly chapterNumber?: number
  readonly length?: number
  readonly grade?: LitrpgRating
  readonly progress?: number
  readonly completedAt?: string
}

export interface LitrpgCatalog {
  readonly stories: readonly LitrpgStory[]
  readonly chapters: readonly LitrpgChapter[]
}
