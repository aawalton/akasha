import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seaLoreForArcaneCrafting = {
  id: "01a0d60c-75b6-7fb3-b231-89195f3ae8c0",
  type: "page-type/temper-lore-book",
  slug: "sea-lore-for-arcane-crafting",
  title: "Sea Lore for Arcane Crafting",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7174,
  bookIndex: 49,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
