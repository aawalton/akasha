import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherAnythingButUnderstandingReachesMe = {
  id: "01a077ed-9aad-7da9-a61c-f3a30c7b2cf1",
  type: "page-type/all-about-alan-question",
  slug: "whether-anything-but-understanding-reaches-me",
  topic: "all-about-alan-topic/what-understanding-cannot-reach",
  ask: "Does anything reach me that is not understanding, and what would that even look like?",
} as const satisfies AllAboutAlanQuestion
