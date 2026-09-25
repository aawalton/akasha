import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songsOfVvardenfell = {
  id: "01a0d5f7-aa99-76b1-97ec-1c6e724626c5",
  type: "page-type/temper-lore-book",
  slug: "songs-of-vvardenfell",
  title: "Songs of Vvardenfell",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4437,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
