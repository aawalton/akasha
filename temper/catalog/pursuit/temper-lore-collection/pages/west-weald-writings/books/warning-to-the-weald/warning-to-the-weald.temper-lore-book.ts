import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningToTheWeald = {
  id: "01a0d60d-4ab1-7b1f-ae41-b5bdb178b317",
  type: "page-type/temper-lore-book",
  slug: "warning-to-the-weald",
  title: "Warning to the Weald",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7895,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
