import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const auntAnelasCookbook = {
  id: "01a0d5f2-db25-7372-9fb1-b35abf18c878",
  type: "page-type/temper-lore-book",
  slug: "aunt-anelas-cookbook",
  title: "Aunt Anela's Cookbook",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1203,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
