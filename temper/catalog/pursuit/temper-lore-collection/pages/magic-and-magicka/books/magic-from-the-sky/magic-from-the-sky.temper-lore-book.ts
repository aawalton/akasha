import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const magicFromTheSky = {
  id: "01a0d5e3-fde3-7e3e-912b-f3fd73bb9e6d",
  type: "page-type/temper-lore-book",
  slug: "magic-from-the-sky",
  title: "Magic from the Sky",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
