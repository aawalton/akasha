import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seaGiantPredation = {
  id: "01a0d60b-a362-7022-94c3-a59456da0505",
  type: "page-type/temper-lore-book",
  slug: "sea-giant-predation",
  title: "Sea Giant Predation",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6249,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
