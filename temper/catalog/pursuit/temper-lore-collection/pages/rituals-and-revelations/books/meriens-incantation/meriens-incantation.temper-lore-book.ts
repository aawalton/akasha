import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const meriensIncantation = {
  id: "01a0d5f5-444b-74d1-bfcf-f680d5f74d1f",
  type: "page-type/temper-lore-book",
  slug: "meriens-incantation",
  title: "Merien's Incantation",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 835,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
