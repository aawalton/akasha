import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heartOfValenwood = {
  id: "01a0d5f5-f3e4-7f6c-8fe7-b276bdecd4e3",
  type: "page-type/temper-lore-book",
  slug: "heart-of-valenwood",
  title: "Heart of Valenwood",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1821,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
