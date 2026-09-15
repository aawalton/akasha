import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherKeepingQuietIsMasking = {
  id: "01a077e7-aae3-7c86-b664-28362f80699d",
  type: "page-type/all-about-alan-question",
  slug: "whether-keeping-quiet-is-masking",
  topic: "all-about-alan-topic/keeping-my-own-volume-down",
  ask: "Is keeping my volume down the same thing as masking, and does it fall apart along with masking under load?",
} as const satisfies AllAboutAlanQuestion
