import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldNordDrinkingSong = {
  id: "01a0d60b-8108-7a76-bf89-88d481ea5156",
  type: "page-type/temper-lore-book",
  slug: "old-nord-drinking-song",
  title: "Old Nord Drinking Song",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6052,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
