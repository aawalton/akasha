import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const angryLoveLetter = {
  id: "01a0d5f2-af6f-70eb-89d1-07013a100144",
  type: "page-type/temper-lore-book",
  slug: "angry-love-letter",
  title: "Angry Love Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1025,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
