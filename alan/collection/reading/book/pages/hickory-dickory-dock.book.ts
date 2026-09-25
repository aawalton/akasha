import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hickoryDickoryDock = {
  id: "019db533-f399-7beb-8a28-da9e8f1472b1",
  type: "page-type/book",
  slug: "hickory-dickory-dock",
  title: "Hickory Dickory Dock",
  status: "not-started",
  author: "Kelly Caswell",
  unit: "unit/words",
  position: 26,
} as const satisfies Book
