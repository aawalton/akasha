import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zaysharasFirstNote = {
  id: "01a0d5f6-d68c-758c-bedc-617edc547f62",
  type: "page-type/temper-lore-book",
  slug: "zaysharas-first-note",
  title: "Zayshara's First Note",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3039,
  bookIndex: 34,
  charted: true,
  quest: 5453,
  positions: "jsonl",
} as const satisfies TemperLoreBook
