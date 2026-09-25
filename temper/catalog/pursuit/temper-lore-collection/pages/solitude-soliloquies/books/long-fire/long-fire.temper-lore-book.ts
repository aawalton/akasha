import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const longFire = {
  id: "01a0d60b-8108-7c27-bd33-3cf8ca22fc9c",
  type: "page-type/temper-lore-book",
  slug: "long-fire",
  title: "Long Fire",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5914,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
