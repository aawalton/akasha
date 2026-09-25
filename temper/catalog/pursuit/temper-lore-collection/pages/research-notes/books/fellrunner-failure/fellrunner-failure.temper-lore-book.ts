import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fellrunnerFailure = {
  id: "01a0d5f5-1384-7e7a-9ffa-6339621bec4e",
  type: "page-type/temper-lore-book",
  slug: "fellrunner-failure",
  title: "Fellrunner Failure?",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 5087,
  bookIndex: 99,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
