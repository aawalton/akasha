import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dossierZadaza = {
  id: "01a0d5f6-a299-7151-98d0-8097492f5a7e",
  type: "page-type/temper-lore-book",
  slug: "dossier-zadaza",
  title: "Dossier: Zadaza",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5295,
  bookIndex: 82,
  charted: true,
  quest: 6266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
