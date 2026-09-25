import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToThePentarch = {
  id: "01a0d60b-8108-7554-885c-c83834a0e722",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-pentarch",
  title: "Letter to the Pentarch",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5818,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
