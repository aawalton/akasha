import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mechanicalFundamentMaintenanceLogs = {
  id: "01a0d60a-a213-7371-aa74-078e43c307ae",
  type: "page-type/temper-lore-book",
  slug: "mechanical-fundament-maintenance-logs",
  title: "Mechanical Fundament Maintenance Logs",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4589,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
