import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lordVivecsQuestions = {
  id: "01a0d5f6-1c16-7b8c-af56-40637f6e9e3b",
  type: "page-type/temper-lore-book",
  slug: "lord-vivecs-questions",
  title: "Lord Vivec's Questions",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 3980,
  bookIndex: 73,
  charted: true,
  quest: 5803,
  positions: "jsonl",
} as const satisfies TemperLoreBook
