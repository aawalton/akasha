import { QUESTION_PAGE_TYPE_SLUG } from "../question-status/question-status.module.code.ts"

const NOTHING_ANSWERS = [
  `a \`${QUESTION_PAGE_TYPE_SLUG}\` sits in the old page store rather than in akasha,`,
  "and the pages system service answers for akasha alone.",
  "how many questions wait on Alan is counted nowhere.",
].join(" ")

export async function countOpenQuestions(): Promise<number> {
  throw new Error(`countOpenQuestions: ${NOTHING_ANSWERS}`)
}
