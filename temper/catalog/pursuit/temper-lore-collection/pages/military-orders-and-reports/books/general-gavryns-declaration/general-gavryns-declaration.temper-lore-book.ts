import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const generalGavrynsDeclaration = {
  id: "01a0d5f3-7053-7142-8381-b5be8904ad99",
  type: "page-type/temper-lore-book",
  slug: "general-gavryns-declaration",
  title: "General Gavryn's Declaration",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2499,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
