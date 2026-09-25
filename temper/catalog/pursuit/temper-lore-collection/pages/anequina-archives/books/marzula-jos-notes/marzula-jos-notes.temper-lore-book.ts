import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const marzulaJosNotes = {
  id: "01a0d60b-2345-7ec6-859a-d0f795a53e96",
  type: "page-type/temper-lore-book",
  slug: "marzula-jos-notes",
  title: "Marzula-jo's Notes",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5472,
  bookIndex: 89,
  charted: true,
  quest: 6326,
  positions: "jsonl",
} as const satisfies TemperLoreBook
