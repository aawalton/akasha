import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jeffersonAndHisTimeVolume2 = {
  id: "019db533-f39d-748f-a3e1-777f6603bad4",
  type: "page-type/book",
  slug: "jefferson-and-his-time-volume-2",
  title: "Jefferson & His Time Volume 2",
  status: "not-started",
  author: "Dumas Malone",
  unit: "unit/words",
  position: 2,
  ownLength: 122000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
