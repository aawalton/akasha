import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretsOfMoricarTheInheritor = {
  id: "01a0d60c-40c0-7253-b82f-be76242c43ae",
  type: "page-type/temper-lore-book",
  slug: "secrets-of-moricar-the-inheritor",
  title: "Secrets of Moricar the Inheritor",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6758,
  bookIndex: 13,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
