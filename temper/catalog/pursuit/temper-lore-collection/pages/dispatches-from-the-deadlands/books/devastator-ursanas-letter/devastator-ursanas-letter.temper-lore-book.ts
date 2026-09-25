import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const devastatorUrsanasLetter = {
  id: "01a0d60c-40bf-7878-b79e-d11955932c00",
  type: "page-type/temper-lore-book",
  slug: "devastator-ursanas-letter",
  title: "Devastator Ursana's Letter",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6850,
  bookIndex: 10,
  charted: true,
  quest: 6708,
  positions: "jsonl",
} as const satisfies TemperLoreBook
