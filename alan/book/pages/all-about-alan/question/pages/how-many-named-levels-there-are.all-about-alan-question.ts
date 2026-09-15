import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howManyNamedLevelsThereAre = {
  id: "01a077f3-1084-7ff8-8d2c-5ab82718c73e",
  type: "page-type/all-about-alan-question",
  slug: "how-many-named-levels-there-are",
  topic: "all-about-alan-topic/the-coloured-circles-i-run-on",
  ask: "I described five named levels, one account records four, and what runs shows five. How many named levels are there?",
} as const satisfies AllAboutAlanQuestion
