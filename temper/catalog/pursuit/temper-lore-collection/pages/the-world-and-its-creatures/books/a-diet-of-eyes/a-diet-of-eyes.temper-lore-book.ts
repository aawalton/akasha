import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDietOfEyes = {
  id: "01a0d5f5-f3e2-7280-8090-f1b33f26ac5a",
  type: "page-type/temper-lore-book",
  slug: "a-diet-of-eyes",
  title: "A Diet of Eyes",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 452,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
