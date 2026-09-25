import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const enzamirsNote = {
  id: "01a0d5f4-07b7-7c99-b3d1-861bad0d2f74",
  type: "page-type/temper-lore-book",
  slug: "enzamirs-note",
  title: "Enzamir's Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5680,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
