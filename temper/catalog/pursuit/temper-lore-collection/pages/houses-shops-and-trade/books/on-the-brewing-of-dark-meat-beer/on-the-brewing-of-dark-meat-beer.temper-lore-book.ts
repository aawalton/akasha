import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheBrewingOfDarkMeatBeer = {
  id: "01a0d5f2-db26-73cc-bc2a-a8f4558a29a2",
  type: "page-type/temper-lore-book",
  slug: "on-the-brewing-of-dark-meat-beer",
  title: "On the Brewing of Dark Meat Beer",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 915,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
