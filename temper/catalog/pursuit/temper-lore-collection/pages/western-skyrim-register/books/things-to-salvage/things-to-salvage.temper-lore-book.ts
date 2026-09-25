import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thingsToSalvage = {
  id: "01a0d60b-a362-7226-97bb-cc65e6b15fbc",
  type: "page-type/temper-lore-book",
  slug: "things-to-salvage",
  title: "Things to Salvage",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6038,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
