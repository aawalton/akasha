import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyLimitingResourceCanMoveAgain = {
  id: "01a077ec-8fbd-7747-98e8-f142c68fafdd",
  type: "all-about-alan-question",
  slug: "whether-my-limiting-resource-can-move-again",
  topic: "all-about-alan-topic/what-limits-me",
  ask: "The limiting resource already moved once, from stress to safety, and the hub moved with it. Is the limit fixed at safety now, or can it move again, and what would move it?",
} as const satisfies AllAboutAlanQuestion
