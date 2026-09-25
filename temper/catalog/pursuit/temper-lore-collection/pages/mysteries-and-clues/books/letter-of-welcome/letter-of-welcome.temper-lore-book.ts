import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfWelcome = {
  id: "01a0d5f4-07b8-7268-a4b1-d045369750c1",
  type: "page-type/temper-lore-book",
  slug: "letter-of-welcome",
  title: "Letter of Welcome",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6239,
  charted: false,
} as const satisfies TemperLoreBook
