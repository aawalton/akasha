import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatWindowMySigmaIsComputedOver = {
  id: "01a0c5a6-be0d-76d9-89e8-594ea346eed4",
  type: "page-type/all-about-alan-question",
  slug: "what-window-my-sigma-is-computed-over",
  topic: "all-about-alan-topic/where-my-stoplight-anchors-sit",
  ask: "Is the sigma my bands are spaced by taken over a long baseline, or over a rolling recent window?",
} as const satisfies AllAboutAlanQuestion
