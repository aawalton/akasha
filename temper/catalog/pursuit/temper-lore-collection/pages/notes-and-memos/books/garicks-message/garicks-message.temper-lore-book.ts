import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const garicksMessage = {
  id: "01a0d5f4-3c11-77fb-9249-8528cd194ebc",
  type: "page-type/temper-lore-book",
  slug: "garicks-message",
  title: "Garick's Message",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2049,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
