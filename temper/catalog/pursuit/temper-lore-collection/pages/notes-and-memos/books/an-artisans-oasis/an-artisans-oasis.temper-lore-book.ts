import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anArtisansOasis = {
  id: "01a0d5f4-3c11-7b3b-b6e4-cd591d03dd91",
  type: "page-type/temper-lore-book",
  slug: "an-artisans-oasis",
  title: "An Artisan's Oasis",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2515,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
