import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hagsHarpiesAndHagravens = {
  id: "01a0d5f3-3fda-724a-9c93-c2437ddf120c",
  type: "page-type/temper-lore-book",
  slug: "hags-harpies-and-hagravens",
  title: "Hags, Harpies, and Hagravens",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1769,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
