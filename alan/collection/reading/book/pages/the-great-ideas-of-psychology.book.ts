import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatIdeasOfPsychology = {
  id: "019db533-f39d-7f2d-a254-f1a31d3ab9ef",
  type: "page-type/book",
  slug: "the-great-ideas-of-psychology",
  title: "The Great Ideas of Psychology",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  ownLength: 351750,
  ownProgress: 351750,
} as const satisfies Book
