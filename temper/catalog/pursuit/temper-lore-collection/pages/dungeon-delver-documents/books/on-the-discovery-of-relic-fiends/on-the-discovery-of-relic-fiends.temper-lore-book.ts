import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheDiscoveryOfRelicFiends = {
  id: "01a0d60d-708e-7ba4-a24d-5ac0977bd7aa",
  type: "page-type/temper-lore-book",
  slug: "on-the-discovery-of-relic-fiends",
  title: "On the Discovery of Relic Fiends",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7822,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
