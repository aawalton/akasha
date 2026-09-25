import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gilraedalsBookOfObscureAndAncientSpirits = {
  id: "01a0d60d-4aaf-7d33-9182-b73e5f399d32",
  type: "page-type/temper-lore-book",
  slug: "gilraedals-book-of-obscure-and-ancient-spirits",
  title: "Gilraedal's Book of Obscure and Ancient Spirits",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8001,
  bookIndex: 44,
  charted: true,
  quest: 7084,
  positions: "jsonl",
} as const satisfies TemperLoreBook
