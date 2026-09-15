import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherAGivenWantCanBeRetired = {
  id: "01a077e7-137d-7a08-9092-44d563318c1d",
  type: "page-type/all-about-alan-question",
  slug: "whether-a-given-want-can-be-retired",
  topic: "all-about-alan-topic/how-a-want-fires",
  ask: "Can a want that was given to me rather than written in be retired, or only managed for the rest of my life?",
} as const satisfies AllAboutAlanQuestion
