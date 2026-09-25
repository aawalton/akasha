import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toWarlordIceHeart = {
  id: "01a0d5f6-d68c-743b-a305-285875fb1c88",
  type: "page-type/temper-lore-book",
  slug: "to-warlord-ice-heart",
  title: "To Warlord Ice-Heart",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3147,
  bookIndex: 77,
  charted: true,
  quest: 5450,
  positions: "jsonl",
} as const satisfies TemperLoreBook
