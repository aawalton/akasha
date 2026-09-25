import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prisonerProcedure = {
  id: "01a0d60d-708e-7e57-860b-614214d42cc8",
  type: "page-type/temper-lore-book",
  slug: "prisoner-procedure",
  title: "Prisoner Procedure",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8174,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
