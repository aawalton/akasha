import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const situationBecomingUrgent = {
  id: "01a0d5f4-3c13-7560-a4a9-cdb16dec56d2",
  type: "page-type/temper-lore-book",
  slug: "situation-becoming-urgent",
  title: "Situation Becoming Urgent",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1594,
  bookIndex: 50,
  charted: true,
  quest: 4748,
  positions: "jsonl",
} as const satisfies TemperLoreBook
