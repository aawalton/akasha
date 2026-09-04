import type { Book } from "../../book.page-type.ts"

export const journalOfDiscourses = {
  id: "019db533-f39d-7a1b-9aad-df5865505f9d",
  pageTypeSlug: "book",
  slug: "journal-of-discourses",
  title: "Journal of Discourses",
  status: "not-started",
  author: "Brigham Young",
  unitSlug: "words",
  position: 2,
} as const satisfies Book
