import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crimesOfTheDaggerfallCovenant = {
  id: "01a0d5e4-c4a4-7be5-8231-11019696dd0e",
  type: "page-type/temper-lore-book",
  slug: "crimes-of-the-daggerfall-covenant",
  title: "Crimes of the Daggerfall Covenant",
  collection: "temper-lore-collection/auridon-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
