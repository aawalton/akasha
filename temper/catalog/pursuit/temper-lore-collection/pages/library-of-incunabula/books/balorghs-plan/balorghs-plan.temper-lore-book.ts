import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const balorghsPlan = {
  id: "01a0d5f8-02f8-7c01-8684-780f125650f7",
  type: "page-type/temper-lore-book",
  slug: "balorghs-plan",
  title: "Balorgh's Plan",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5050,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
