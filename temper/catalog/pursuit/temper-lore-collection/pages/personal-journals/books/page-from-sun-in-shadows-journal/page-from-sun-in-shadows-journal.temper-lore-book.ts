import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pageFromSunInShadowsJournal = {
  id: "01a0d5f4-6f1b-7df3-bce6-d7de8ccf71cd",
  type: "page-type/temper-lore-book",
  slug: "page-from-sun-in-shadows-journal",
  title: "Page from Sun-in-Shadow's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 4435,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
