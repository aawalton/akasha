import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMagesCipher = {
  id: "01a0d5f4-07b9-7cbd-b998-44f97e4738e0",
  type: "page-type/temper-lore-book",
  slug: "the-mages-cipher",
  title: "The Mage's Cipher",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2056,
  bookIndex: 49,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
