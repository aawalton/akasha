import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const paleCreaturesWithATasteForFlesh = {
  id: "01a0d60b-a362-7d23-a3e3-d923026eced7",
  type: "page-type/temper-lore-book",
  slug: "pale-creatures-with-a-taste-for-flesh",
  title: "Pale Creatures with a Taste for Flesh",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6048,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
