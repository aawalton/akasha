import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dryPage = {
  id: "01a0d5f6-1c15-73fc-a040-0e9a993ab67e",
  type: "page-type/temper-lore-book",
  slug: "dry-page",
  title: "Dry Page",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 328,
  bookIndex: 3,
  charted: true,
  quest: 4071,
  positions: "jsonl",
} as const satisfies TemperLoreBook
