import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatMyHundredChecksCover = {
  id: "01a077ea-9a61-7c0c-b554-26771edfc412",
  type: "all-about-alan-question",
  slug: "what-my-hundred-checks-cover",
  topic: "all-about-alan-topic/how-many-checks-i-run",
  ask: "What do my hundred checks actually cover, and which failure case did each check come from?",
} as const satisfies AllAboutAlanQuestion
