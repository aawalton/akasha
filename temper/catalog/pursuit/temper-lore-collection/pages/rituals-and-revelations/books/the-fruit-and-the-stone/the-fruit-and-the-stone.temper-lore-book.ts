import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFruitAndTheStone = {
  id: "01a0d5f5-444c-7b0b-b8af-dc94780f57df",
  type: "page-type/temper-lore-book",
  slug: "the-fruit-and-the-stone",
  title: "The Fruit and the Stone",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 71,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
