import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uelasSong = {
  id: "01a0d5f6-1c16-762b-9343-fea6f1a6651e",
  type: "page-type/temper-lore-book",
  slug: "uelas-song",
  title: "Uela's Song",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1849,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
