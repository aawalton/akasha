import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainNilailsLog = {
  id: "01a0d60d-ff69-737c-a981-0d4373c8c267",
  type: "page-type/temper-lore-book",
  slug: "captain-nilails-log",
  title: "Captain Nilail's Log",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8455,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
