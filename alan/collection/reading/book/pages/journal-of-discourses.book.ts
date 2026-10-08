import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journalOfDiscourses = {
  id: "019db533-f39d-7a1b-9aad-df5865505f9d",
  type: "page-type/book",
  slug: "journal-of-discourses",
  title: "Journal of Discourses",
  status: "not-started",
  author: "Brigham Young",
  unit: "unit/words",
  position: 2,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
