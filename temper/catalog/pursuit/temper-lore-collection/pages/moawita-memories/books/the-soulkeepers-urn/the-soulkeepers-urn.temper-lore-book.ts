import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSoulkeepersUrn = {
  id: "01a0d60a-f1ed-7f74-a0c0-290095089b1b",
  type: "page-type/temper-lore-book",
  slug: "the-soulkeepers-urn",
  title: "The Soulkeeper's Urn",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4821,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
