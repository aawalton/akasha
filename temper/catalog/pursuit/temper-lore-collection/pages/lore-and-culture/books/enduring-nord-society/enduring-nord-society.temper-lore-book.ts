import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const enduringNordSociety = {
  id: "01a0d5f3-3fda-70eb-a618-6aa0103d2a75",
  type: "page-type/temper-lore-book",
  slug: "enduring-nord-society",
  title: "Enduring Nord Society",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2997,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
