import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seekingTributePlayers = {
  id: "01a0d60c-9395-7967-b154-a532565133aa",
  type: "page-type/temper-lore-book",
  slug: "seeking-tribute-players",
  title: "Seeking Tribute Players!",
  collection: "temper-lore-collection/tomes-of-tributes",
  esoBookId: 7168,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
