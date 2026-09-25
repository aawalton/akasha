import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSpindleclutchExpedition = {
  id: "01a0d5f5-1386-7acb-aa2b-f87e910e9a7f",
  type: "page-type/temper-lore-book",
  slug: "the-spindleclutch-expedition",
  title: "The Spindleclutch Expedition",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 335,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
