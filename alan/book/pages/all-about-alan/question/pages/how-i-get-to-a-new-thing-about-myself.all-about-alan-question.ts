import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howIGetToANewThingAboutMyself = {
  id: "01a0c9a7-39e7-72a5-9a0f-00797dc72f15",
  type: "page-type/all-about-alan-question",
  slug: "how-i-get-to-a-new-thing-about-myself",
  topic: "all-about-alan-topic/when-i-learn-something-new-about-myself",
  ask: "I know when I am learning something new about myself but not how exactly to get there. What produces one of those, and what could be done on purpose to bring one on?",
} as const satisfies AllAboutAlanQuestion
