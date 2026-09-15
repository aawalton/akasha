import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherBehaviourAndUncertaintyLearn = {
  id: "01a077e9-7d74-71ed-b60c-f720e3a8f666",
  type: "page-type/all-about-alan-question",
  slug: "whether-behaviour-and-uncertainty-learn",
  topic: "all-about-alan-topic/how-i-read-whether-someone-is-safe",
  ask: "Do the behaviour read and the uncertainty read learn person by person too, or does only the physiological read learn?",
} as const satisfies AllAboutAlanQuestion
