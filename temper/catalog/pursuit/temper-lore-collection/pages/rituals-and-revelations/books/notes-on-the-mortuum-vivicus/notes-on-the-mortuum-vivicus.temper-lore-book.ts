import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnTheMortuumVivicus = {
  id: "01a0d5f5-444c-7e9d-bc95-b36d95441ec4",
  type: "page-type/temper-lore-book",
  slug: "notes-on-the-mortuum-vivicus",
  title: "Notes on the Mortuum Vivicus",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2024,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
