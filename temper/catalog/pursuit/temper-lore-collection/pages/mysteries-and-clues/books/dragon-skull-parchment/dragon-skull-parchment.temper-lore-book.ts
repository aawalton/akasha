import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragonSkullParchment = {
  id: "01a0d5f4-07b7-782f-8372-bdd5f4b8ab22",
  type: "page-type/temper-lore-book",
  slug: "dragon-skull-parchment",
  title: "Dragon Skull Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 849,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
