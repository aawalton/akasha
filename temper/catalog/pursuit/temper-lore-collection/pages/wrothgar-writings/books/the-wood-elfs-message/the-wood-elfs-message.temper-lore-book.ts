import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWoodElfsMessage = {
  id: "01a0d5f6-d68c-77d8-a804-9776ec797d19",
  type: "page-type/temper-lore-book",
  slug: "the-wood-elfs-message",
  title: "The Wood Elf's Message",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3054,
  bookIndex: 33,
  charted: true,
  quest: 5468,
  positions: "jsonl",
} as const satisfies TemperLoreBook
