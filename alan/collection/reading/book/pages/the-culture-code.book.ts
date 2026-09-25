import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCultureCode = {
  id: "019db533-f39d-7e77-bf55-d31aa73ee184",
  type: "page-type/book",
  slug: "the-culture-code",
  title: "The Culture Code",
  status: "not-started",
  author: "Daniel Coyle",
  unit: "unit/words",
  ownLength: 108300,
} as const satisfies Book
