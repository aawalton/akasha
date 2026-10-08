import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePatientWillSeeYouNow = {
  id: "019db533-f39d-7ef6-ba33-e5d81cf7cd18",
  type: "page-type/book",
  slug: "the-patient-will-see-you-now",
  title: "The Patient Will See You Now",
  status: "not-started",
  author: "Eric J. Topol",
  unit: "unit/words",
  ownLength: 169050,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
