import type { Book } from "../../book.page-type.ts"

export const theEndOfAverage = {
  id: "019db533-f39d-7ed8-9cd4-cdbaa0af0984",
  pageTypeSlug: "book",
  slug: "the-end-of-average",
  title: "The End of Average",
  kind: "read",
  status: "not-started",
  author: "Todd Rose, Todd Rose",
  unitSlug: "words",
  ownLength: 97800,
} as const satisfies Book
