import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCaptainOghul = {
  id: "01a0d60a-d5bd-7e23-b278-217e83bc2a77",
  type: "page-type/temper-lore-book",
  slug: "letter-to-captain-oghul",
  title: "Letter to Captain Oghul",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4857,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
