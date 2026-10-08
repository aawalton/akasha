import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMysteriousAffairAtStyles = {
  id: "019db533-f399-7ce0-8ae5-1d20eb94ae78",
  type: "page-type/book",
  slug: "the-mysterious-affair-at-styles",
  title: "The Mysterious Affair at Styles",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 1,
  ownLength: 74000,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
