import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const privateDispatchSecret = {
  id: "01a0d5f3-0ef8-7348-81f4-721c67b630b0",
  type: "page-type/temper-lore-book",
  slug: "private-dispatch-secret",
  title: "Private Dispatch (Secret!)",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1034,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
