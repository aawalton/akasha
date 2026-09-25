import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tomeOfTheUndaunted = {
  id: "01a0d5f2-83a3-7618-82ad-ee2b45451092",
  type: "page-type/temper-lore-book",
  slug: "tome-of-the-undaunted",
  title: "Tome of the Undaunted",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 3046,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
