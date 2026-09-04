import type { Book } from "../../book.page-type.ts"

export const theIntrovertAdvantage = {
  id: "019db533-f39d-7f3d-b0b0-7ee023e80d05",
  pageTypeSlug: "book",
  slug: "the-introvert-advantage",
  title: "The Introvert Advantage",
  status: "not-started",
  author: "Marti Olsen Laney",
  unitSlug: "words",
  ownLength: 156300,
} as const satisfies Book
