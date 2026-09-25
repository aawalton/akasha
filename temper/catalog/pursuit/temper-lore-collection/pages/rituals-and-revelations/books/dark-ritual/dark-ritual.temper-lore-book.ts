import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkRitual = {
  id: "01a0d5f5-444b-7a64-a222-908cfb946804",
  type: "page-type/temper-lore-book",
  slug: "dark-ritual",
  title: "Dark Ritual",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 447,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
