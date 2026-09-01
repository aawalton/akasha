import { askComposed } from "@shared/pages-query/ask"
import {
  OPEN_QUESTION_STATUS,
  QUESTION_PAGE_TYPE_SLUG,
} from "../question-status/question-status.module.code.ts"

export async function countOpenQuestions(): Promise<number> {
  const asked = await askComposed({
    "page-type": QUESTION_PAGE_TYPE_SLUG,
    where: { status: { is: OPEN_QUESTION_STATUS } },
    keys: ["id"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`countOpenQuestions: ${asked.why}`)
  return asked.answer.n
}
