import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tindoriasListOfNeededSupplies = {
  id: "01a0d60a-d5be-7c3d-a41b-c94a5acbbb17",
  type: "page-type/temper-lore-book",
  slug: "tindorias-list-of-needed-supplies",
  title: "Tindoria's List of Needed Supplies",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4835,
  charted: true,
  quest: 6129,
  positions: "jsonl",
} as const satisfies TemperLoreBook
