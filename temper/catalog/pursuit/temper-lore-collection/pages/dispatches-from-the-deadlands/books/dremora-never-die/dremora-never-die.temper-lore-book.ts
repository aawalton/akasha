import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dremoraNeverDie = {
  id: "01a0d60c-40bf-714a-b2b3-9c53f36844ef",
  type: "page-type/temper-lore-book",
  slug: "dremora-never-die",
  title: "Dremora Never Die",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6575,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
