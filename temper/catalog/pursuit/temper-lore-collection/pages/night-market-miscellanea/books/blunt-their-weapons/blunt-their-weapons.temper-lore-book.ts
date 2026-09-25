import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bluntTheirWeapons = {
  id: "01a0d60e-687e-7441-9cb5-0e0faf7b93cf",
  type: "page-type/temper-lore-book",
  slug: "blunt-their-weapons",
  title: "Blunt Their Weapons",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8642,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
