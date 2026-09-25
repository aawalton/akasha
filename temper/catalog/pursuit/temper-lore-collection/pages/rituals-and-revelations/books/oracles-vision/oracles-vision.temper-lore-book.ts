import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oraclesVision = {
  id: "01a0d5f5-444c-73cf-b92a-787b483af52e",
  type: "page-type/temper-lore-book",
  slug: "oracles-vision",
  title: "Oracle's Vision",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 4893,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
