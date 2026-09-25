import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCodeOfMauloch = {
  id: "01a0d5e2-da85-7b3d-960c-d312210e4c1e",
  type: "page-type/temper-lore-book",
  slug: "the-code-of-mauloch",
  title: "The Code of Mauloch",
  collection: "temper-lore-collection/glenumbra-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
