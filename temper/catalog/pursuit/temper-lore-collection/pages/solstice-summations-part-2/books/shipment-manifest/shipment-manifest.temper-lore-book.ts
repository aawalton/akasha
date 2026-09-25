import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shipmentManifest = {
  id: "01a0d60e-45b3-7204-b0af-c289aefaeba2",
  type: "page-type/temper-lore-book",
  slug: "shipment-manifest",
  title: "Shipment Manifest",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8303,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
