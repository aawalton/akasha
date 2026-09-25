import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const solitudeBedtimeStories = {
  id: "01a0d60b-8109-791c-b412-85994924613a",
  type: "page-type/temper-lore-book",
  slug: "solitude-bedtime-stories",
  title: "Solitude Bedtime Stories",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6230,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
