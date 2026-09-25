import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwemerDungeonsWhatIKnow = {
  id: "01a0d5e4-9c9a-73f3-b74c-685e23ffb533",
  type: "page-type/temper-lore-book",
  slug: "dwemer-dungeons-what-i-know",
  title: "Dwemer Dungeons: What I Know",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
