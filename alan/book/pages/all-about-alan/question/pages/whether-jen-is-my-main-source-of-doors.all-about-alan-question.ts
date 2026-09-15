import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherJenIsMyMainSourceOfDoors = {
  id: "01a077ea-fd53-75be-8a5e-4aad81cc32a8",
  type: "page-type/all-about-alan-question",
  slug: "whether-jen-is-my-main-source-of-doors",
  topic: "all-about-alan-topic/what-it-takes-to-break-me",
  ask: "Is Jen, whose imagining runs where mine does not, my main source of doors?",
} as const satisfies AllAboutAlanQuestion
