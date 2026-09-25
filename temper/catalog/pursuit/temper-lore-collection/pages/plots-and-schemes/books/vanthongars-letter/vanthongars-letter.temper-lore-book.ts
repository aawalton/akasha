import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vanthongarsLetter = {
  id: "01a0d5f4-c389-741d-97c1-c92a97e6b973",
  type: "page-type/temper-lore-book",
  slug: "vanthongars-letter",
  title: "Vanthongar's Letter",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 5279,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
