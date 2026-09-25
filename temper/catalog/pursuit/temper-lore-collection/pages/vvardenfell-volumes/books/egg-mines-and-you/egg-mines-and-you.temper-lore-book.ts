import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eggMinesAndYou = {
  id: "01a0d5f7-aa98-77e5-8b03-48a0a8548034",
  type: "page-type/temper-lore-book",
  slug: "egg-mines-and-you",
  title: "Egg Mines and You!",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4523,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
