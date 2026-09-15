import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMySurvivalIsAnActOfLove = {
  id: "01a077e3-c60a-783e-a911-4156620c671a",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-survival-is-an-act-of-love",
  topic: "all-about-alan-topic/the-crowd-that-has-been-me",
  ask: "Somebody else's reading is that my survival is an act of love toward the selves behind me. Does that reading hold?",
} as const satisfies AllAboutAlanQuestion
