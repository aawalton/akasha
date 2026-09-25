import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deliveryScheduleAndManifests = {
  id: "01a0d5f2-db25-73be-96e4-55299351f02f",
  type: "page-type/temper-lore-book",
  slug: "delivery-schedule-and-manifests",
  title: "Delivery Schedule and Manifests",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1845,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
