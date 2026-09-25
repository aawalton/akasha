import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const historiesVolume2 = {
  id: "019db533-f39d-7541-ae74-b62161570cd1",
  type: "page-type/book",
  slug: "histories-volume-2",
  title: "Histories Volume 2",
  status: "not-started",
  author: "Yuval Noah Harari",
  unit: "unit/words",
  position: 2,
} as const satisfies Book
