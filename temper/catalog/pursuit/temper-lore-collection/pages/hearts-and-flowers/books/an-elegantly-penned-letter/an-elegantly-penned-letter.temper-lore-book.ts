import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anElegantlyPennedLetter = {
  id: "01a0d5f2-af6f-7008-8d3b-ef1b0f0eff55",
  type: "page-type/temper-lore-book",
  slug: "an-elegantly-penned-letter",
  title: "An Elegantly Penned Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1297,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
