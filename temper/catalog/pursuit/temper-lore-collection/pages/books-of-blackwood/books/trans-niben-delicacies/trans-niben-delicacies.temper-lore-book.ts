import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const transNibenDelicacies = {
  id: "01a0d60b-fdb1-7fd0-9a2a-20f97442eff2",
  type: "page-type/temper-lore-book",
  slug: "trans-niben-delicacies",
  title: "Trans-Niben Delicacies",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6706,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
