import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jeffersonAndHisTimeVolume4 = {
  id: "019db533-f39d-73f3-9c4c-2fd7d8a16faa",
  type: "page-type/book",
  slug: "jefferson-and-his-time-volume-4",
  title: "Jefferson & His Time Volume 4",
  status: "not-started",
  author: "Dumas Malone",
  unit: "unit/words",
  position: 4,
  ownLength: 125000,
} as const satisfies Book
