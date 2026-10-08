import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const scandinavianFolkAndFairyTales = {
  id: "019db533-f39d-7970-b922-d5109abe4f80",
  type: "page-type/book",
  slug: "scandinavian-folk-and-fairy-tales",
  title: "Scandinavian Folk & Fairy Tales",
  status: "not-started",
  author: "Claire Booss",
  unit: "unit/words",
  position: 1,
  ownLength: 166500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
