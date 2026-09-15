import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherThreeSecondsIsMeasurable = {
  id: "01a077e9-5955-78e6-8844-01903371395d",
  type: "page-type/all-about-alan-question",
  slug: "whether-three-seconds-is-measurable",
  topic: "all-about-alan-topic/the-three-seconds-i-am",
  ask: "Does three seconds track anything measurable, or is three seconds a figure for short and present-bound?",
} as const satisfies AllAboutAlanQuestion
