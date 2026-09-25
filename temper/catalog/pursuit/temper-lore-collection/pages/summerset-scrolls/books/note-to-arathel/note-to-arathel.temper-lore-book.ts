import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToArathel = {
  id: "01a0d60a-d5bd-766d-907f-ad080a67bbdb",
  type: "page-type/temper-lore-book",
  slug: "note-to-arathel",
  title: "Note to Arathel",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4858,
  bookIndex: 73,
  charted: true,
  quest: 6116,
  positions: "jsonl",
} as const satisfies TemperLoreBook
