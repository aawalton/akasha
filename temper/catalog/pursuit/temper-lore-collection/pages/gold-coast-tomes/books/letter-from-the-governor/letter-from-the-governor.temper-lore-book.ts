import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTheGovernor = {
  id: "01a0d5f7-73fa-7f56-bc5e-f0a829133f8f",
  type: "page-type/temper-lore-book",
  slug: "letter-from-the-governor",
  title: "Letter from the Governor",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3415,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
