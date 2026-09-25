import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guildmasterMerricsNotes = {
  id: "01a0d5f3-7053-7d0e-8a55-348aa5aca289",
  type: "page-type/temper-lore-book",
  slug: "guildmaster-merrics-notes",
  title: "Guildmaster Merric's Notes",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 8330,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
