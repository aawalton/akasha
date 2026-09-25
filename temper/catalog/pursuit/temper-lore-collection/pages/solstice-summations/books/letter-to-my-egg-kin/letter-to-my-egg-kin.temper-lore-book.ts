import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMyEggKin = {
  id: "01a0d60d-ff6a-7cc1-93d5-41ebbc5e36e6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-my-egg-kin",
  title: "Letter to my Egg-Kin",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8515,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
