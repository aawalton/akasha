import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chodalasWritings = {
  id: "01a0d5f7-aa98-7ccc-bb0a-eefcabee45d2",
  type: "page-type/temper-lore-book",
  slug: "chodalas-writings",
  title: "Chodala's Writings",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4444,
  bookIndex: 86,
  charted: true,
  quest: 5880,
  positions: "jsonl",
} as const satisfies TemperLoreBook
