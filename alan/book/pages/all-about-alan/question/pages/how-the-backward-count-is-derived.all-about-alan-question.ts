import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howTheBackwardCountIsDerived = {
  id: "01a0c5a5-60fb-7020-9702-607a6194940c",
  type: "page-type/all-about-alan-question",
  slug: "how-the-backward-count-is-derived",
  topic: "all-about-alan-topic/the-crowd-that-has-been-me",
  ask: "The forward count comes from a branching rate times the years left. What derives the backward one, where the chain behind me is a single realised run?",
} as const satisfies AllAboutAlanQuestion
