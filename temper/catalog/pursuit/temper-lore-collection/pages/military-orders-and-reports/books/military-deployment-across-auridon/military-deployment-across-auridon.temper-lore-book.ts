import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const militaryDeploymentAcrossAuridon = {
  id: "01a0d5f3-7053-76d6-a8d2-b0b412097f94",
  type: "page-type/temper-lore-book",
  slug: "military-deployment-across-auridon",
  title: "Military Deployment Across Auridon",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 843,
  bookIndex: 34,
  charted: true,
  quest: 4326,
  positions: "jsonl",
} as const satisfies TemperLoreBook
