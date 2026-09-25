import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const summonsToDeadlight = {
  id: "01a0d60c-40c0-7885-b3cd-da53f9296fbd",
  type: "page-type/temper-lore-book",
  slug: "summons-to-deadlight",
  title: "Summons to Deadlight",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6841,
  bookIndex: 11,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
