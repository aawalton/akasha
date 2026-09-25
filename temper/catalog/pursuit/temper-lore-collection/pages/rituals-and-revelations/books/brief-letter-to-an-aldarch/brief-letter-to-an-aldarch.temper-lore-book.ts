import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const briefLetterToAnAldarch = {
  id: "01a0d5f5-444b-780b-9593-cfe61e49b7c7",
  type: "page-type/temper-lore-book",
  slug: "brief-letter-to-an-aldarch",
  title: "Brief Letter to an Aldarch",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 762,
  bookIndex: 19,
  charted: true,
  quest: 4300,
  positions: "jsonl",
} as const satisfies TemperLoreBook
