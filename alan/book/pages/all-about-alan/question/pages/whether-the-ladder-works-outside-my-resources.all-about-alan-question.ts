import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheLadderWorksOutsideMyResources = {
  id: "01a077e5-ed77-77d6-8751-efd8a0b35e22",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-ladder-works-outside-my-resources",
  topic: "all-about-alan-topic/how-well-i-can-measure",
  ask: "Does the measuring ladder work on anything I track outside my resources?",
} as const satisfies AllAboutAlanQuestion
