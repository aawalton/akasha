import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const curatorsListOfSoughtAfterRelics = {
  id: "01a0d5f6-d68a-751c-a866-6293aabf3331",
  type: "page-type/temper-lore-book",
  slug: "curators-list-of-sought-after-relics",
  title: "Curator's List of Sought-After Relics",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3132,
  bookIndex: 49,
  charted: true,
  quest: 5476,
  positions: "jsonl",
} as const satisfies TemperLoreBook
