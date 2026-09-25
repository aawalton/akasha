import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningBulletin = {
  id: "01a0d60d-4ab0-72dd-bc05-a93ee4b8eb2b",
  type: "page-type/temper-lore-book",
  slug: "warning-bulletin",
  title: "Warning Bulletin!",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8002,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
