import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const narsisDrenAndTheLostNotebook = {
  id: "01a0d5f6-d68b-7e99-a626-2144ab8a5fd1",
  type: "page-type/temper-lore-book",
  slug: "narsis-dren-and-the-lost-notebook",
  title: "Narsis Dren and the Lost Notebook",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3024,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
