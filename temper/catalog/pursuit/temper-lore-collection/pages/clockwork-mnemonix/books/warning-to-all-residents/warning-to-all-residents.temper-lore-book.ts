import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningToAllResidents = {
  id: "01a0d60a-a214-726c-af69-b7ed03b90faf",
  type: "page-type/temper-lore-book",
  slug: "warning-to-all-residents",
  title: "Warning to All Residents",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4892,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
