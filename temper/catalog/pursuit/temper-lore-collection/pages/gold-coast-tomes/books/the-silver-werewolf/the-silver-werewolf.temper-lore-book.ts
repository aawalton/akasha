import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSilverWerewolf = {
  id: "01a0d5f7-73fb-7eed-bc1c-52c773c3360c",
  type: "page-type/temper-lore-book",
  slug: "the-silver-werewolf",
  title: "The Silver Werewolf",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3691,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
