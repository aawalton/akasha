import type { Book } from "../../book.page-type.ts"

export const sevenMiraclesThatSavedTheWorld = {
  id: "019db533-f39d-79bb-9066-1cde84d1c106",
  pageTypeSlug: "book",
  slug: "seven-miracles-that-saved-the-world",
  title: "Seven Miracles that Saved the World",
  kind: "read",
  status: "not-started",
  author: "Chris Stewart, Ted Stewart",
  unitSlug: "words",
  position: 7,
  ownLength: 71000,
} as const satisfies Book
