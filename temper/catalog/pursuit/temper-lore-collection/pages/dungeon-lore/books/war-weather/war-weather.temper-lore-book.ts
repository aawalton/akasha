import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warWeather = {
  id: "01a0d5e3-aaa1-7c7c-bb24-385374254bce",
  type: "page-type/temper-lore-book",
  slug: "war-weather",
  title: "War Weather",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
