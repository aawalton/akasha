import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howManyWarmingHoursBuyABetterDay = {
  id: "01a077e7-ad57-71e7-898a-0f9b412521be",
  type: "page-type/all-about-alan-question",
  slug: "how-many-warming-hours-buy-a-better-day",
  topic: "all-about-alan-topic/warming-up-what-i-will-need",
  ask: "How many hours of warming up buys how much of a better day?",
} as const satisfies AllAboutAlanQuestion
