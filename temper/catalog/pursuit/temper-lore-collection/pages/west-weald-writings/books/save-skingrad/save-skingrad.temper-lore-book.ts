import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const saveSkingrad = {
  id: "01a0d60d-4ab0-7a4d-a980-49ceac0f400c",
  type: "page-type/temper-lore-book",
  slug: "save-skingrad",
  title: "Save Skingrad!",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8019,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
