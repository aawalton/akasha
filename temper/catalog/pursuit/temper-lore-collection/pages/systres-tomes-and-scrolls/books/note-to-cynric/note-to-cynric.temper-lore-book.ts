import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToCynric = {
  id: "01a0d60c-75b5-7257-9778-650a89834d43",
  type: "page-type/temper-lore-book",
  slug: "note-to-cynric",
  title: "Note to Cynric",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6949,
  charted: true,
  quest: 6767,
  positions: "jsonl",
} as const satisfies TemperLoreBook
