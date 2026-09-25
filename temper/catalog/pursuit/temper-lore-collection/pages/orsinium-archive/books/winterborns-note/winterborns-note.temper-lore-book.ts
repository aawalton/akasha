import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const winterbornsNote = {
  id: "01a0d5f7-160c-7464-87af-807ef795b30d",
  type: "page-type/temper-lore-book",
  slug: "winterborns-note",
  title: "Winterborn's Note",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2770,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
