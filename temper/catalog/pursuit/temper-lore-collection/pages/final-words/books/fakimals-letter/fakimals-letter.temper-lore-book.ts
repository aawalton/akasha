import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fakimalsLetter = {
  id: "01a0d5f6-45ad-79e2-876b-790324cf3dbb",
  type: "page-type/temper-lore-book",
  slug: "fakimals-letter",
  title: "Fakimal's Letter",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1550,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
