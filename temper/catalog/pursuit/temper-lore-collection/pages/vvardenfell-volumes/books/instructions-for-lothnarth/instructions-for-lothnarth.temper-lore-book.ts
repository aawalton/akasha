import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const instructionsForLothnarth = {
  id: "01a0d5f7-aa99-7850-87bd-2c8f12e4366f",
  type: "page-type/temper-lore-book",
  slug: "instructions-for-lothnarth",
  title: "Instructions for Lothnarth",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4053,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
