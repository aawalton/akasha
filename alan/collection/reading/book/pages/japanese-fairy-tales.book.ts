import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const japaneseFairyTales = {
  id: "019db533-f39d-7a98-958a-4b0ff572c0ba",
  type: "page-type/book",
  slug: "japanese-fairy-tales",
  title: "Japanese Fairy Tales",
  status: "completed",
  grade: "C",
  author: "Yei Theodora Ozaki",
  unit: "unit/words",
  position: 5,
  ownLength: 70250,
  ownProgress: 70250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
