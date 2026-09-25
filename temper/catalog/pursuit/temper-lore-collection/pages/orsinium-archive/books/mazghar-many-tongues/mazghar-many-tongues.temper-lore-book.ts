import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mazgharManyTongues = {
  id: "01a0d5f7-160b-7dd0-96e1-39ac699f35a7",
  type: "page-type/temper-lore-book",
  slug: "mazghar-many-tongues",
  title: "Mazghar Many-Tongues",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3035,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
