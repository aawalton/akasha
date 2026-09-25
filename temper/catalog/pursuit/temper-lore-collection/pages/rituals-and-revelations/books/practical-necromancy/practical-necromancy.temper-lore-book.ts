import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const practicalNecromancy = {
  id: "01a0d5f5-444c-7a2a-a5c6-6b8467f8bc1c",
  type: "page-type/temper-lore-book",
  slug: "practical-necromancy",
  title: "Practical Necromancy",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 468,
  bookIndex: 11,
  charted: true,
  quest: 4201,
  positions: "jsonl",
} as const satisfies TemperLoreBook
