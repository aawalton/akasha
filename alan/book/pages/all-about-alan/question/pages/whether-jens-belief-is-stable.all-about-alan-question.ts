import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherJensBeliefIsStable = {
  id: "01a077f0-94d5-72c9-ba03-e668b861e11b",
  type: "page-type/all-about-alan-question",
  slug: "whether-jens-belief-is-stable",
  topic: "all-about-alan-topic/what-i-cannot-say-to-her",
  ask: "The landing rests on Jen holding a belief my silence protects. Is that belief stable, and what happens if the construction becomes visible to her?",
} as const satisfies AllAboutAlanQuestion
