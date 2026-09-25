import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwemerMaintenanceRecords = {
  id: "01a0d5f5-1384-750b-b31a-21d7edcf9e71",
  type: "page-type/temper-lore-book",
  slug: "dwemer-maintenance-records",
  title: "Dwemer Maintenance Records",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1397,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
