import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const constableUlbrensNotebook = {
  id: "01a0d60d-4aaf-7fef-9ac8-4ddfb2bb7f86",
  type: "page-type/temper-lore-book",
  slug: "constable-ulbrens-notebook",
  title: "Constable Ulbren's Notebook",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7891,
  bookIndex: 21,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
