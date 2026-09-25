import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lookAtThisGuardDispatch = {
  id: "01a0d5f7-4293-7af3-ad30-63075015bfed",
  type: "page-type/temper-lore-book",
  slug: "look-at-this-guard-dispatch",
  title: "Look at this Guard Dispatch!",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3434,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
