import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const statuaryComplications = {
  id: "01a0d5f3-0ef8-7f36-ac00-b3ee774608bf",
  type: "page-type/temper-lore-book",
  slug: "statuary-complications",
  title: "Statuary Complications",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2411,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
