import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trollSocializationResearchNotes = {
  id: "01a0d5f6-45ae-792c-87bc-533d7c6414d3",
  type: "page-type/temper-lore-book",
  slug: "troll-socialization-research-notes",
  title: "Troll Socialization Research Notes",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1987,
  bookIndex: 54,
  charted: true,
  quest: 4944,
  positions: "jsonl",
} as const satisfies TemperLoreBook
