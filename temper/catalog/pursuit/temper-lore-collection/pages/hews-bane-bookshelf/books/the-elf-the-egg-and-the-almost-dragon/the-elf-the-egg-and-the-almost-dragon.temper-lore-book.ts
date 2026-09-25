import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theElfTheEggAndTheAlmostDragon = {
  id: "01a0d5f7-4294-7eac-bd7e-dfbd02121056",
  type: "page-type/temper-lore-book",
  slug: "the-elf-the-egg-and-the-almost-dragon",
  title: "The Elf, the Egg, and the Almost-Dragon",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3238,
  bookIndex: 31,
  charted: true,
  quest: 5535,
  positions: "jsonl",
} as const satisfies TemperLoreBook
