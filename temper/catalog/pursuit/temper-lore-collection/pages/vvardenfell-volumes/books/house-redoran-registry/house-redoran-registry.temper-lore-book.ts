import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRedoranRegistry = {
  id: "01a0d5f7-aa99-7174-8147-c144db26b07a",
  type: "page-type/temper-lore-book",
  slug: "house-redoran-registry",
  title: "House Redoran Registry",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4056,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
