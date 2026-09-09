import type { Book } from "../book.page-type.ts"

export const unmaskingAutism = {
  id: "019db533-f39d-7de1-b266-08b35ba3e727",
  pageTypeSlug: "book",
  type: "book",
  slug: "unmasking-autism",
  title: "Unmasking Autism",
  status: "not-started",
  author: "Devon Price",
  unit: "words",
  ownLength: 147750,
} as const satisfies Book
