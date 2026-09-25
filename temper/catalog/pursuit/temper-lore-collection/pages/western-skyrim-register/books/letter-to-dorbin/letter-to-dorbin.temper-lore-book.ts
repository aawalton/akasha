import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDorbin = {
  id: "01a0d60b-a361-751a-bd41-308ec16e0162",
  type: "page-type/temper-lore-book",
  slug: "letter-to-dorbin",
  title: "Letter to Dorbin",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6218,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
