import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const delverNotes = {
  id: "01a0d5f5-1384-7030-85ae-aa409d88b75e",
  type: "page-type/temper-lore-book",
  slug: "delver-notes",
  title: "Delver Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 460,
  bookIndex: 21,
  charted: true,
  quest: 4147,
  positions: "jsonl",
} as const satisfies TemperLoreBook
