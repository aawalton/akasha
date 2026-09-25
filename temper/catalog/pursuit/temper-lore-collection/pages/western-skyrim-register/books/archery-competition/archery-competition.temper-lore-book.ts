import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archeryCompetition = {
  id: "01a0d60b-a361-755b-a2e5-b64ebda5d699",
  type: "page-type/temper-lore-book",
  slug: "archery-competition",
  title: "Archery Competition",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6079,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
