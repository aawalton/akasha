import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aConstantHunger = {
  id: "01a0d60c-40bf-73c4-a390-75d152d03973",
  type: "page-type/temper-lore-book",
  slug: "a-constant-hunger",
  title: "A Constant Hunger",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6764,
  bookIndex: 71,
  charted: true,
  quest: 6705,
  positions: "jsonl",
} as const satisfies TemperLoreBook
