import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const survivingTheShambles = {
  id: "01a0d60c-40c0-7244-b3c2-86dfbb93243e",
  type: "page-type/temper-lore-book",
  slug: "surviving-the-shambles",
  title: "Surviving the Shambles",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6738,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
