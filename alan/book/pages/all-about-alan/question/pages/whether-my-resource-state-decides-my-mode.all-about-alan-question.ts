import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyResourceStateDecidesMyMode = {
  id: "01a077ea-1c3d-73da-ad91-8cce23b4c7f4",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-resource-state-decides-my-mode",
  topic: "all-about-alan-topic/the-modes-i-run-in",
  ask: "Low mana pushing me onto the harness and low safety degrading my physical responses are both proposed and untested. Does my resource state decide which mode is even available?",
} as const satisfies AllAboutAlanQuestion
