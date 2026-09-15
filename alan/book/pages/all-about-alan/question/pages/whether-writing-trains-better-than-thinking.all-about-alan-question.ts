import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherWritingTrainsBetterThanThinking = {
  id: "01a077e5-e07d-7037-b8c1-e0bb1aec55d3",
  type: "all-about-alan-question",
  slug: "whether-writing-trains-better-than-thinking",
  topic: "all-about-alan-topic/how-a-skill-gets-into-me",
  ask: "Does writing train my response weights better than thinking alone does?",
} as const satisfies AllAboutAlanQuestion
