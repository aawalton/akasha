import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minutesOfTheElderCouncil = {
  id: "01a0d5f6-f385-7836-ba06-0fda333a3c4d",
  type: "page-type/temper-lore-book",
  slug: "minutes-of-the-elder-council",
  title: "Minutes of the Elder Council",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2955,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
