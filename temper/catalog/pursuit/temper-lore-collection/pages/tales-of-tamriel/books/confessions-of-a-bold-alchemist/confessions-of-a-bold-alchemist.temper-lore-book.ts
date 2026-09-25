import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const confessionsOfABoldAlchemist = {
  id: "01a0d5f5-7766-7dd4-9db5-6a158a016e82",
  type: "page-type/temper-lore-book",
  slug: "confessions-of-a-bold-alchemist",
  title: "Confessions of a Bold Alchemist",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 912,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
