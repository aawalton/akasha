import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherGameProgressFeedsMySafety = {
  id: "01a077e2-906e-71d5-bae8-31d1bb968bff",
  type: "page-type/all-about-alan-question",
  slug: "whether-game-progress-feeds-my-safety",
  topic: "all-about-alan-topic/the-progress-i-get-to-keep",
  ask: "Does the support a game gives my mental health make game progress a feeder into my safety?",
} as const satisfies AllAboutAlanQuestion
