import type { Book } from "../../book.page-type.ts"

export const sevenMiraclesThatSavedAmerica = {
  id: "019db533-f39d-7a62-aec7-f5856d83bf7e",
  pageTypeSlug: "book",
  slug: "seven-miracles-that-saved-america",
  title: "Seven Miracles that Saved America",
  kind: "read",
  status: "not-started",
  author: "Chris Stewart, Ted Stewart",
  unitSlug: "words",
  position: 6,
  ownLength: 73500,
} as const satisfies Book
