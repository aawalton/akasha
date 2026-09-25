import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noSignificantDanger = {
  id: "01a0d5f4-3c12-788f-8cba-cb945511ada1",
  type: "page-type/temper-lore-book",
  slug: "no-significant-danger",
  title: "No Significant Danger",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1817,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
