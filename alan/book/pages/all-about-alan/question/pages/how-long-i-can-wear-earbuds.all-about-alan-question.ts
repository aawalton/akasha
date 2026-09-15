import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howLongICanWearEarbuds = {
  id: "01a077e3-7abf-7c72-b9e8-55e687348f68",
  type: "page-type/all-about-alan-question",
  slug: "how-long-i-can-wear-earbuds",
  topic: "all-about-alan-topic/how-i-keep-sound-down",
  ask: "How many hours can I wear the earbuds before the earbud pressure costs me more than the noise would?",
} as const satisfies AllAboutAlanQuestion
