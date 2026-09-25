import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redExileInstructions = {
  id: "01a0d5f7-aa99-75ba-85e7-ffc9a54a7474",
  type: "page-type/temper-lore-book",
  slug: "red-exile-instructions",
  title: "Red Exile Instructions",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4016,
  bookIndex: 84,
  charted: true,
  quest: 5880,
  positions: "jsonl",
} as const satisfies TemperLoreBook
