import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToArtisansCraftworks = {
  id: "01a0d5f3-0ef8-714f-97f7-48fc06aa6485",
  type: "page-type/temper-lore-book",
  slug: "letter-to-artisans-craftworks",
  title: "Letter to Artisans Craftworks",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2548,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
