import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const endOfMyPatience = {
  id: "01a0d5f1-f451-770a-a04e-f1822720eff9",
  type: "page-type/temper-lore-book",
  slug: "end-of-my-patience",
  title: "End of My Patience",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1956,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
