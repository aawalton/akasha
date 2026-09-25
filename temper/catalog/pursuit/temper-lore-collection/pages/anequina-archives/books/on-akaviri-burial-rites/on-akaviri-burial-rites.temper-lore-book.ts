import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onAkaviriBurialRites = {
  id: "01a0d60b-2345-78ff-a9ae-dafe8e5a711c",
  type: "page-type/temper-lore-book",
  slug: "on-akaviri-burial-rites",
  title: "On Akaviri Burial Rites",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5461,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
