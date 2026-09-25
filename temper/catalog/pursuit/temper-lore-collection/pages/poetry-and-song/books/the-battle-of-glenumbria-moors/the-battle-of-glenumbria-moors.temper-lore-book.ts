import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfGlenumbriaMoors = {
  id: "01a0d5e4-38b2-7d97-9218-dae574de46d7",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-glenumbria-moors",
  title: "The Battle of Glenumbria Moors",
  collection: "temper-lore-collection/poetry-and-song",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
