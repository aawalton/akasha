import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yffresHymn = {
  id: "01a0d60d-4ab1-746f-b740-a0f4dc95763e",
  type: "page-type/temper-lore-book",
  slug: "yffres-hymn",
  title: "Y'ffre's Hymn",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8127,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
