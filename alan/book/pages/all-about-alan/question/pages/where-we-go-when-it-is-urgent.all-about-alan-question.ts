import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whereWeGoWhenItIsUrgent = {
  id: "01a0c5a3-c9f3-7988-b509-68fd30b84856",
  type: "page-type/all-about-alan-question",
  slug: "where-we-go-when-it-is-urgent",
  topic: "all-about-alan-topic/who-looks-after-our-health",
  ask: "Where do the five of us actually go for urgent care, for an emergency, and out of hours, and who does our eyes?",
} as const satisfies AllAboutAlanQuestion
