import type { Book } from "../book.page-type.types.ts"

export const sevenMiraclesThatSavedAmerica = {
  id: "019db533-f39d-7a62-aec7-f5856d83bf7e",
  pageTypeSlug: "book",
  type: "book",
  slug: "seven-miracles-that-saved-america",
  title: "Seven Miracles that Saved America",
  status: "not-started",
  author: "Chris Stewart, Ted Stewart",
  unit: "words",
  position: 6,
  ownLength: 73500,
} as const satisfies Book
