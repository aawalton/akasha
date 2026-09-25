import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToRulassalmo = {
  id: "01a0d5f2-af70-7520-96df-c268c6f1c2d4",
  type: "page-type/temper-lore-book",
  slug: "letter-to-rulassalmo",
  title: "Letter to Rulassalmo",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 635,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
