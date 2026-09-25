import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const valenwoodAStudy = {
  id: "01a0d5e4-74e1-7975-9eb7-6f501b2521e2",
  type: "page-type/temper-lore-book",
  slug: "valenwood-a-study",
  title: "Valenwood: A Study",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
