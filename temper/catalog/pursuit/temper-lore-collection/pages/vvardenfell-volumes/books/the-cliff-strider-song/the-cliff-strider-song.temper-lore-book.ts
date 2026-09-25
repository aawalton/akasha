import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCliffStriderSong = {
  id: "01a0d5f7-aa99-74a0-ad08-47ad65c7606c",
  type: "page-type/temper-lore-book",
  slug: "the-cliff-strider-song",
  title: "The Cliff Strider Song",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3999,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
