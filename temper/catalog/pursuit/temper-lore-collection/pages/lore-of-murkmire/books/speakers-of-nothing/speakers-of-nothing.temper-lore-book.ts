import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const speakersOfNothing = {
  id: "01a0d5f6-a29a-7286-b338-a2fe6ceb70f8",
  type: "page-type/temper-lore-book",
  slug: "speakers-of-nothing",
  title: "Speakers of Nothing",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5364,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
