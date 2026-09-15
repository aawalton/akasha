import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichPapersSaidAgentsDoBetterWithFiles = {
  id: "01a077e5-deba-7b2b-afd1-52f188cbf1ca",
  type: "page-type/all-about-alan-question",
  slug: "which-papers-said-agents-do-better-with-files",
  topic: "all-about-alan-topic/what-i-invented-and-what-i-read",
  ask: "Which research papers did I see on agents doing better with files, and what did each paper actually claim?",
} as const satisfies AllAboutAlanQuestion
