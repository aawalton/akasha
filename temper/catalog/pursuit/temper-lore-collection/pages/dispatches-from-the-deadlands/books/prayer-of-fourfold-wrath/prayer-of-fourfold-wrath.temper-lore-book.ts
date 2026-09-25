import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prayerOfFourfoldWrath = {
  id: "01a0d60c-40c0-7656-b333-9d0855f0c57d",
  type: "page-type/temper-lore-book",
  slug: "prayer-of-fourfold-wrath",
  title: "Prayer of Fourfold Wrath",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6724,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
