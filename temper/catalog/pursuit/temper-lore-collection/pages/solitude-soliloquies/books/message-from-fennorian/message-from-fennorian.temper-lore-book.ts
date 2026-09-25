import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const messageFromFennorian = {
  id: "01a0d60b-8108-77c0-ad30-c81318dc0501",
  type: "page-type/temper-lore-book",
  slug: "message-from-fennorian",
  title: "Message from Fennorian",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5763,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
