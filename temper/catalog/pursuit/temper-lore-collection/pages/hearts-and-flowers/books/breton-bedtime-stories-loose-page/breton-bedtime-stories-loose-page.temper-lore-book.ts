import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bretonBedtimeStoriesLoosePage = {
  id: "01a0d5f2-af6f-7de0-81b2-d4988f5bb6dd",
  type: "page-type/temper-lore-book",
  slug: "breton-bedtime-stories-loose-page",
  title: "Breton Bedtime Stories (Loose Page)",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1380,
  bookIndex: 44,
  charted: true,
  quest: 4468,
  positions: "jsonl",
} as const satisfies TemperLoreBook
