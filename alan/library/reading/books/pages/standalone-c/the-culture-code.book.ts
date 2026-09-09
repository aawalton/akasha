import type { Book } from "../../book.page-type.ts"

export const theCultureCode = {
  id: "019db533-f39d-7e77-bf55-d31aa73ee184",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-culture-code",
  title: "The Culture Code",
  status: "not-started",
  author: "Daniel Coyle",
  unit: "words",
  ownLength: 108300,
} as const satisfies Book
