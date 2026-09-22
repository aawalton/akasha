import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatANewThingAboutMyselfFeelsLike = {
  id: "01a0c9a8-1ba5-7f3c-974e-a47c2b053641",
  type: "page-type/all-about-alan-question",
  slug: "what-a-new-thing-about-myself-feels-like",
  topic: "all-about-alan-topic/when-i-learn-something-new-about-myself",
  ask: "What does it feel like from the inside when I am learning something new about myself, and is it a click, a discomfort, or something physical?",
} as const satisfies AllAboutAlanQuestion
