import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const josselinesLetter = {
  id: "01a0d5f2-253a-717d-b2a9-074bade9a0cc",
  type: "page-type/temper-lore-book",
  slug: "josselines-letter",
  title: "Josseline's Letter",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 510,
  bookIndex: 12,
  charted: true,
  quest: 4201,
  positions: "jsonl",
} as const satisfies TemperLoreBook
