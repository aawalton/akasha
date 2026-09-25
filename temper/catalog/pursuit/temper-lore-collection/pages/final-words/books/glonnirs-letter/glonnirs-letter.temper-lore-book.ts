import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glonnirsLetter = {
  id: "01a0d5f6-45ad-7895-9e3b-873b96426fc0",
  type: "page-type/temper-lore-book",
  slug: "glonnirs-letter",
  title: "Glonnir's Letter",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1657,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
