import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const favensNote = {
  id: "01a0d60c-40c0-785d-b347-0d3f8897f2a0",
  type: "page-type/temper-lore-book",
  slug: "favens-note",
  title: "Faven's Note",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6849,
  bookIndex: 28,
  charted: false,
} as const satisfies TemperLoreBook
