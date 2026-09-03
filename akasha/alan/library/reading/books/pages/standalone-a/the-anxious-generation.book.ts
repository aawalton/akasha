import type { Book } from "../../book.page-type.ts"

export const theAnxiousGeneration = {
  id: "019db533-f39e-706f-83c8-c07638353629",
  pageTypeSlug: "book",
  slug: "the-anxious-generation",
  title: "The Anxious Generation",
  kind: "read",
  status: "not-started",
  author: "Jonathan Haidt",
  unitSlug: "words",
  ownLength: 157950,
} as const satisfies Book
