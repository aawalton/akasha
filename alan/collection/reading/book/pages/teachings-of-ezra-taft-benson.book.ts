import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfEzraTaftBenson = {
  id: "019db533-f39d-79cc-8cfb-ffed4301b388",
  type: "page-type/book",
  slug: "teachings-of-ezra-taft-benson",
  title: "Teachings of Ezra Taft Benson",
  status: "not-started",
  author: "Ezra Taft Benson",
  unit: "unit/words",
  position: 14,
  ownLength: 176500,
} as const satisfies Book
