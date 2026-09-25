import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fargravesSong = {
  id: "01a0d60c-40c0-750f-a6eb-d9212c395e8c",
  type: "page-type/temper-lore-book",
  slug: "fargraves-song",
  title: "Fargrave's Song",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6900,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
