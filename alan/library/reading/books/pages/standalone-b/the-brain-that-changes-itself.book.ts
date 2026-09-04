import type { Book } from "../../book.page-type.ts"

export const theBrainThatChangesItself = {
  id: "019db533-f39d-7f0e-9fcb-0d9e0626cc17",
  pageTypeSlug: "book",
  slug: "the-brain-that-changes-itself",
  title: "The Brain That Changes Itself",
  status: "not-started",
  author: "Norman Doidge",
  unitSlug: "words",
  ownLength: 171000,
} as const satisfies Book
