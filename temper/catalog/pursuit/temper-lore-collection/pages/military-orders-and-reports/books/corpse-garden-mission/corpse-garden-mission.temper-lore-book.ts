import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const corpseGardenMission = {
  id: "01a0d5f3-7052-7dd3-a3df-2f6fc4302f79",
  type: "page-type/temper-lore-book",
  slug: "corpse-garden-mission",
  title: "Corpse Garden Mission",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 564,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
