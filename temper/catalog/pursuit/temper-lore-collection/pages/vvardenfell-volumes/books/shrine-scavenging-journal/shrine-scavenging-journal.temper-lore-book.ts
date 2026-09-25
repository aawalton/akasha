import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shrineScavengingJournal = {
  id: "01a0d5f7-aa99-7c4d-a7a0-3a1a6031123a",
  type: "page-type/temper-lore-book",
  slug: "shrine-scavenging-journal",
  title: "Shrine Scavenging Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4492,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
