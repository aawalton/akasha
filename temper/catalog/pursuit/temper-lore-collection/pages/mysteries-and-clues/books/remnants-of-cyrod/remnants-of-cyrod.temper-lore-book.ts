import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const remnantsOfCyrod = {
  id: "01a0d5f4-07b8-70e7-83d0-1a217a67a220",
  type: "page-type/temper-lore-book",
  slug: "remnants-of-cyrod",
  title: "Remnants of Cyrod",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 964,
  bookIndex: 20,
  charted: true,
  quest: 4386,
  positions: "jsonl",
} as const satisfies TemperLoreBook
