import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dossierTheNewcomer = {
  id: "01a0d5f6-a299-7775-b964-49e8354f4de8",
  type: "page-type/temper-lore-book",
  slug: "dossier-the-newcomer",
  title: "Dossier: The Newcomer",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5296,
  bookIndex: 83,
  charted: true,
  quest: 6266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
