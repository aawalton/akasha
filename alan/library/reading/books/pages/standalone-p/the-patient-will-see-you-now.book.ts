import type { Book } from "../../book.page-type.ts"

export const thePatientWillSeeYouNow = {
  id: "019db533-f39d-7ef6-ba33-e5d81cf7cd18",
  pageTypeSlug: "book",
  slug: "the-patient-will-see-you-now",
  title: "The Patient Will See You Now",
  status: "not-started",
  author: "Eric J. Topol",
  unitSlug: "words",
  ownLength: 169050,
} as const satisfies Book
