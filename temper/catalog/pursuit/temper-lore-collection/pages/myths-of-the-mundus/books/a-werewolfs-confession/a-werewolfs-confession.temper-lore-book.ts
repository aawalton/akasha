import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aWerewolfsConfession = {
  id: "01a0d5e4-11d6-76ba-877e-723124ebf529",
  type: "page-type/temper-lore-book",
  slug: "a-werewolfs-confession",
  title: "A Werewolf's Confession",
  collection: "temper-lore-collection/myths-of-the-mundus",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
