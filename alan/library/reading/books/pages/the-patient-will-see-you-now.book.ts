import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const thePatientWillSeeYouNow = {
  id: "019db533-f39d-7ef6-ba33-e5d81cf7cd18",
  type: "book",
  slug: "the-patient-will-see-you-now",
  title: "The Patient Will See You Now",
  status: "not-started",
  author: "Eric J. Topol",
  unit: "words",
  ownLength: 169050,
} as const satisfies Book
