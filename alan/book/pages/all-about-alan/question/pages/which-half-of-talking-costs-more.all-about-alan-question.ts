import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichHalfOfTalkingCostsMore = {
  id: "01a077e8-f60a-7409-a0eb-09d9eb6f6640",
  type: "page-type/all-about-alan-question",
  slug: "which-half-of-talking-costs-more",
  topic: "all-about-alan-topic/what-an-activity-costs-me",
  ask: "Talking costs me twice, in the work of keeping up and in the recovery talking pauses. Which half is the bigger one?",
} as const satisfies AllAboutAlanQuestion
