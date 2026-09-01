import type { PageWhere } from "@shared/pages-core/page-types"
import { askComposed } from "@shared/pages-query/ask"
import type { Database } from "../../supabase-database/src/generated/database"
import type { SupabaseClient } from "@supabase/supabase-js"

export const QUESTION_PAGE_TYPE_SLUG = "question"

export const OPEN_QUESTION_STATUS = "open"

export const ANSWERED_QUESTION_STATUS = "answered"

export const DISMISSED_QUESTION_STATUS = "dismissed"

export function openQuestionsWhere(): PageWhere {
  return [{ key: "status", eq: OPEN_QUESTION_STATUS }]
}

export async function countOpenQuestions(_sb: SupabaseClient<Database>): Promise<number> {
  const asked = await askComposed({
    "page-type": QUESTION_PAGE_TYPE_SLUG,
    where: { status: { is: OPEN_QUESTION_STATUS } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`countOpenQuestions: ${asked.why}`)
  return asked.answer.n
}

export const ANSWERED_OPTION_INDEX_KEY = "answeredOptionIndex"

export const RECONCILED_AT_KEY = "reconciledAt"

export function selectTappedOptionIndex(args: {
  readonly options: readonly string[]
  readonly claimedIndex: number | undefined
  readonly content: string
}): number | null {
  const { options, claimedIndex, content } = args
  if (claimedIndex === undefined) return null
  if (!Number.isInteger(claimedIndex) || claimedIndex < 0) return null
  const option = options[claimedIndex]
  if (option === undefined) return null
  return option.trim() === content.trim() ? claimedIndex : null
}

export type QuestionLinkPlatform = "web" | "native"

export const QUESTION_LINK_PLATFORMS = ["web", "native"] as const

export type QuestionLink = {
  readonly label: string
  readonly url: string
  readonly platform: QuestionLinkPlatform
}
