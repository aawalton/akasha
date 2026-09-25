import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blueAedralShipmentDetails = {
  id: "01a0d60d-4aae-74f8-aa66-6874146120c9",
  type: "page-type/temper-lore-book",
  slug: "blue-aedral-shipment-details",
  title: "Blue Aedral Shipment Details",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7803,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
