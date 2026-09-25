import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAncientEye = {
  id: "01a0d5f5-444c-770f-a33f-0dc3389f65ec",
  type: "page-type/temper-lore-book",
  slug: "the-ancient-eye",
  title: "The Ancient Eye",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 869,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
