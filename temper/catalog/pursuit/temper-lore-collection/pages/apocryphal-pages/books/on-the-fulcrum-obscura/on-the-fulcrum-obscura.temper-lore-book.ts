import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheFulcrumObscura = {
  id: "01a0d60d-156e-7880-90e6-fcd872eea9a9",
  type: "page-type/temper-lore-book",
  slug: "on-the-fulcrum-obscura",
  title: "On the Fulcrum Obscura",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7680,
  bookIndex: 6,
  charted: true,
  quest: 6975,
  positions: "jsonl",
} as const satisfies TemperLoreBook
