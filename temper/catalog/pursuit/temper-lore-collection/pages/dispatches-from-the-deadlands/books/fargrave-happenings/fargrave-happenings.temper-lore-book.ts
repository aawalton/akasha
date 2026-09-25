import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fargraveHappenings = {
  id: "01a0d60c-40c0-705e-9a82-6f71fa2b058e",
  type: "page-type/temper-lore-book",
  slug: "fargrave-happenings",
  title: "Fargrave Happenings",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6737,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
