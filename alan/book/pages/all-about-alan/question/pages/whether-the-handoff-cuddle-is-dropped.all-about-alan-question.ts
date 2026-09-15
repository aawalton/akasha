import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheHandoffCuddleIsDropped = {
  id: "01a077e9-a251-7802-8e88-e2f0cc19d543",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-handoff-cuddle-is-dropped",
  topic: "all-about-alan-topic/sharing-a-bed",
  ask: "The cuddle at the handoff is parked because setting the cuddle up is a level-five conversation. Is the cuddle dropped, or only overtaken?",
} as const satisfies AllAboutAlanQuestion
