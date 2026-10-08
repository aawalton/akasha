import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hardwiringHappiness = {
  id: "019db533-f39e-724c-b506-0c3d11200cfe",
  type: "page-type/book",
  slug: "hardwiring-happiness",
  title: "Hardwiring Happiness",
  status: "not-started",
  author: "Hanson, Rick (Psychologist)",
  unit: "unit/words",
  ownLength: 115050,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
