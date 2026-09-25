import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDominionsDutyMarbruk = {
  id: "01a0d5f5-f3e4-704a-8c80-833453321187",
  type: "page-type/temper-lore-book",
  slug: "the-dominions-duty-marbruk",
  title: "The Dominion's Duty: Marbruk",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1826,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
