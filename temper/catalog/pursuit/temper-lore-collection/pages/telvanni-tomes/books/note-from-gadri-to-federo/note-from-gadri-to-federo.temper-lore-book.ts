import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromGadriToFedero = {
  id: "01a0d60c-eb9c-7699-8b0f-2f200df0f1c8",
  type: "page-type/temper-lore-book",
  slug: "note-from-gadri-to-federo",
  title: "Note from Gadri to Federo",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7579,
  bookIndex: 75,
  charted: true,
  quest: 7018,
  positions: "jsonl",
} as const satisfies TemperLoreBook
