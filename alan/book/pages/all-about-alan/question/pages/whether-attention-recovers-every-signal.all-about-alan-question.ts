import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherAttentionRecoversEverySignal = {
  id: "01a077f1-13b8-7089-88eb-17ad78931e06",
  type: "page-type/all-about-alan-question",
  slug: "whether-attention-recovers-every-signal",
  topic: "all-about-alan-topic/the-body-signals-i-can-barely-hear",
  ask: "Does attention recover every quiet signal or only part of them, and does attention stop working once my attention is already spent?",
} as const satisfies AllAboutAlanQuestion
