import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jeffersonAndHisTimeVolume1 = {
  id: "019db533-f39d-7550-9183-e67cd2f071be",
  type: "page-type/book",
  slug: "jefferson-and-his-time-volume-1",
  title: "Jefferson & His Time Volume 1",
  status: "not-started",
  author: "Dumas Malone",
  unit: "unit/words",
  position: 1,
  ownLength: 112750,
} as const satisfies Book
