import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichPartsOfMyEthicsAreMine = {
  id: "01a077e4-c13b-759f-9cc3-b50834bc5a88",
  type: "all-about-alan-question",
  slug: "which-parts-of-my-ethics-are-mine",
  topic: "all-about-alan-topic/the-ethics-i-worked-out",
  ask: "This is the central unresolved thread and should be asked directly: which parts of the moral framework are mine, and which belong to the idealised system the framework is written for?",
} as const satisfies AllAboutAlanQuestion
