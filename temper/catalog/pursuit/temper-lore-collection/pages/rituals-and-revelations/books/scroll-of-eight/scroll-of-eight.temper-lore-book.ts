import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrollOfEight = {
  id: "01a0d5f5-444c-787d-a477-44139178adb2",
  type: "page-type/temper-lore-book",
  slug: "scroll-of-eight",
  title: "Scroll of Eight",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1072,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
