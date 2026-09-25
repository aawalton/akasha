import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const protocolsOfTheCourtOfContempt = {
  id: "01a0d5e5-15ef-7c6a-a5b8-c30e0f5f2e89",
  type: "page-type/temper-lore-book",
  slug: "protocols-of-the-court-of-contempt",
  title: "Protocols of the Court of Contempt",
  collection: "temper-lore-collection/coldharbour-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
