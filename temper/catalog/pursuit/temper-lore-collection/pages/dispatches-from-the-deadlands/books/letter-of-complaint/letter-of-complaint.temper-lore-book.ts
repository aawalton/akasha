import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfComplaint = {
  id: "01a0d60c-40c0-751c-9138-823bc7303507",
  type: "page-type/temper-lore-book",
  slug: "letter-of-complaint",
  title: "Letter of Complaint",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6927,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
