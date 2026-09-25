import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrueNatureOfOrcs = {
  id: "01a0d5e2-da85-71b4-851b-8ab44e2c1e3d",
  type: "page-type/temper-lore-book",
  slug: "the-true-nature-of-orcs",
  title: "The True Nature of Orcs",
  collection: "temper-lore-collection/glenumbra-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
