import type { PageWhere } from "@akasha/pages-core/page-types"

export const QUESTION_PAGE_TYPE_SLUG = "question"

export const OPEN_QUESTION_STATUS = "open"

export const ANSWERED_QUESTION_STATUS = "answered"

export const DISMISSED_QUESTION_STATUS = "dismissed"

export function openQuestionsWhere(): PageWhere {
  return [{ key: "status", eq: OPEN_QUESTION_STATUS }]
}
