import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kikosFinalRiddle = {
  id: "01a0d60c-baf3-769e-b064-e9bfa3a2cec4",
  type: "page-type/temper-lore-book",
  slug: "kikos-final-riddle",
  title: "Kiko's Final Riddle",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7309,
  bookIndex: 21,
  charted: true,
  quest: 6860,
  positions: "jsonl",
} as const satisfies TemperLoreBook
