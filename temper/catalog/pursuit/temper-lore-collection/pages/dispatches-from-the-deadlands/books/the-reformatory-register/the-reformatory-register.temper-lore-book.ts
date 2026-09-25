import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theReformatoryRegister = {
  id: "01a0d60c-40c1-7c7c-8312-238eb4396665",
  type: "page-type/temper-lore-book",
  slug: "the-reformatory-register",
  title: "The Reformatory Register",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6745,
  bookIndex: 21,
  charted: true,
  quest: 6698,
  positions: "jsonl",
} as const satisfies TemperLoreBook
