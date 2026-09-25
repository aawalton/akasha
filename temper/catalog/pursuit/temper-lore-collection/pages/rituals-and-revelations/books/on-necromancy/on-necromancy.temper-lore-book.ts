import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onNecromancy = {
  id: "01a0d5f5-444c-77fe-84cc-c7c3eb6c05f9",
  type: "page-type/temper-lore-book",
  slug: "on-necromancy",
  title: "On Necromancy",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2095,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
