import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheNextHalfStepLimitHoldsEverywhere = {
  id: "01a077e8-d485-7366-81c0-72dffe16a849",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-next-half-step-limit-holds-everywhere",
  topic: "all-about-alan-topic/how-far-back-i-expect-to-come",
  ask: "Does seeing only the next half step hold across everything I track, or only for safety?",
} as const satisfies AllAboutAlanQuestion
