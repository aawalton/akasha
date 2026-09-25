import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorsNote = {
  id: "01a0d5f3-7053-7e06-ad4e-feceb4a97aba",
  type: "page-type/temper-lore-book",
  slug: "investigators-note",
  title: "Investigator's Note",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2925,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
