import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const draugrAndTheDragonCult = {
  id: "01a0d60b-a361-7486-b828-8ef30763be5f",
  type: "page-type/temper-lore-book",
  slug: "draugr-and-the-dragon-cult",
  title: "Draugr and the Dragon Cult",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6043,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
