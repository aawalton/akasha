import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTheTwilightMage = {
  id: "01a0d5f3-0ef8-7792-9350-4b8aae28ef62",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-twilight-mage",
  title: "Letter to the Twilight Mage",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2474,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
