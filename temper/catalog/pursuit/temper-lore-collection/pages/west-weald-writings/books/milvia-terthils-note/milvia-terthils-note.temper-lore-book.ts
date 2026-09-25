import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const milviaTerthilsNote = {
  id: "01a0d60d-4aaf-7b70-b0b0-c541c77bfe96",
  type: "page-type/temper-lore-book",
  slug: "milvia-terthils-note",
  title: "Milvia Terthil's Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7896,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
