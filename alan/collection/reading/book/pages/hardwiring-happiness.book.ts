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
} as const satisfies Book
