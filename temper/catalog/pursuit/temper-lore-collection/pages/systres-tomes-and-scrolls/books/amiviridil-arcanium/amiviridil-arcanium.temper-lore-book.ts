import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const amiviridilArcanium = {
  id: "01a0d60c-75b4-74ef-bf81-c257243b5531",
  type: "page-type/temper-lore-book",
  slug: "amiviridil-arcanium",
  title: "Amiviridil Arcanium",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7175,
  bookIndex: 52,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
