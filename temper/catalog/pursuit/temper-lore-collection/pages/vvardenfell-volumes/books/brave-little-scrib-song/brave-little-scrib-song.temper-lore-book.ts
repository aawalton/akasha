import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const braveLittleScribSong = {
  id: "01a0d5f7-aa98-7fd7-804b-7079392e658f",
  type: "page-type/temper-lore-book",
  slug: "brave-little-scrib-song",
  title: "Brave Little Scrib Song",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4425,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
