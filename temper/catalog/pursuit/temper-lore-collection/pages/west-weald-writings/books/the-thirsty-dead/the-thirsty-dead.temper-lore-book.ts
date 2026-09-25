import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theThirstyDead = {
  id: "01a0d60d-4ab0-780d-998e-7ec8c22cd0fc",
  type: "page-type/temper-lore-book",
  slug: "the-thirsty-dead",
  title: "The Thirsty Dead",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8168,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
