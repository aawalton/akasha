import { z } from "zod"
import {
  type ChapterProsePastTurns,
  ChapterProsePastTurnsSchema,
  type ChapterProseTitles,
  ChapterProseTitlesSchema,
} from "../game-schema/game-schema.module.code.ts"

export const ChapterProseDefaultsSchema = z
  .object({
    titles: ChapterProseTitlesSchema.optional(),
    pastTurns: ChapterProsePastTurnsSchema.optional(),
  })
  .strict()
export type ChapterProseDefaults = z.infer<typeof ChapterProseDefaultsSchema>

export const CHAPTER_PROSE_TITLES_DEFAULT: ChapterProseTitles = "shown"
export const CHAPTER_PROSE_PAST_TURNS_DEFAULT: ChapterProsePastTurns = "plain"

export interface ResolvedChapterProseDials {
  readonly titles: ChapterProseTitles
  readonly pastTurns: ChapterProsePastTurns
}

export function resolveChapterProseDials(
  declared: ChapterProseDefaults | undefined
): ResolvedChapterProseDials {
  return {
    titles: declared?.titles ?? CHAPTER_PROSE_TITLES_DEFAULT,
    pastTurns: declared?.pastTurns ?? CHAPTER_PROSE_PAST_TURNS_DEFAULT,
  }
}
