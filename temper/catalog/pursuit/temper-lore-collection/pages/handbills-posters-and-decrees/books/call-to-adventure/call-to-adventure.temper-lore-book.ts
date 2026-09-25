import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callToAdventure = {
  id: "01a0d5f2-83a2-7502-8d62-88164ed2ba87",
  type: "page-type/temper-lore-book",
  slug: "call-to-adventure",
  title: "Call to Adventure!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2220,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
