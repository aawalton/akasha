import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const woundedLion = {
  id: "01a0d5f4-3c13-7711-9b06-7af680adab19",
  type: "page-type/temper-lore-book",
  slug: "wounded-lion",
  title: "Wounded Lion",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1545,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
