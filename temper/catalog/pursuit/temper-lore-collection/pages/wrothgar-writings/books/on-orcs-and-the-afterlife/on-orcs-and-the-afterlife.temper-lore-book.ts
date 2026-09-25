import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onOrcsAndTheAfterlife = {
  id: "01a0d5f6-d68b-7861-aa56-09845311e6b1",
  type: "page-type/temper-lore-book",
  slug: "on-orcs-and-the-afterlife",
  title: "On Orcs and the Afterlife",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3051,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
