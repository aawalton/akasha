import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const messageOfWelcome = {
  id: "01a0d5f8-02f9-7968-8f8b-09721f12c30c",
  type: "page-type/temper-lore-book",
  slug: "message-of-welcome",
  title: "Message of Welcome",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7186,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
