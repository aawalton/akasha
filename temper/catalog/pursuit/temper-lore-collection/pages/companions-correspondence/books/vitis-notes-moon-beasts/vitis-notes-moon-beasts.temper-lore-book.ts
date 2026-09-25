import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vitisNotesMoonBeasts = {
  id: "01a0d60d-bbe4-7589-a622-0d514d974388",
  type: "page-type/temper-lore-book",
  slug: "vitis-notes-moon-beasts",
  title: "Viti's Notes: Moon Beasts",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8326,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
