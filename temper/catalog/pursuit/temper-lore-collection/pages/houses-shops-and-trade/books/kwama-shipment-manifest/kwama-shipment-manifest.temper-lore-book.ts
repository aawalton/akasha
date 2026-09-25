import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kwamaShipmentManifest = {
  id: "01a0d5f2-db26-756c-81e0-6c75487d80eb",
  type: "page-type/temper-lore-book",
  slug: "kwama-shipment-manifest",
  title: "Kwama Shipment Manifest",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 503,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
