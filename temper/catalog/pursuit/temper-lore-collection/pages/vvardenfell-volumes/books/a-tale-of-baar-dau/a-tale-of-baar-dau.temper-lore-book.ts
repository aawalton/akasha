import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTaleOfBaarDau = {
  id: "01a0d5f7-aa98-796f-a6ff-24cafc192526",
  type: "page-type/temper-lore-book",
  slug: "a-tale-of-baar-dau",
  title: "A Tale of Baar Dau",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4521,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
