import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const faenalirsLetter = {
  id: "01a0d60d-708d-78e9-973c-4bca885af032",
  type: "page-type/temper-lore-book",
  slug: "faenalirs-letter",
  title: "Faenalir's Letter",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7814,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
