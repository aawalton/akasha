import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheMatterOfThePrisoners = {
  id: "01a0d5f4-3c12-7935-8e18-68ff0e8e45c2",
  type: "page-type/temper-lore-book",
  slug: "on-the-matter-of-the-prisoners",
  title: "On the Matter of the Prisoners",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1605,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
