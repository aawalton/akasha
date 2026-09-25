import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToTheDaggerfallCovenant = {
  id: "01a0d5e2-da84-7f50-a482-09bf8e52b3a7",
  type: "page-type/temper-lore-book",
  slug: "guide-to-the-daggerfall-covenant",
  title: "Guide to the Daggerfall Covenant",
  collection: "temper-lore-collection/glenumbra-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
