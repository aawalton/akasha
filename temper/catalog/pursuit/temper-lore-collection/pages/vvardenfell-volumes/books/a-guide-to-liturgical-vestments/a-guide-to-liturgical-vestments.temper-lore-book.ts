import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGuideToLiturgicalVestments = {
  id: "01a0d5f7-aa98-71c1-ba27-575c17d9387a",
  type: "page-type/temper-lore-book",
  slug: "a-guide-to-liturgical-vestments",
  title: "A Guide to Liturgical Vestments",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4001,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
