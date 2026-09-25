import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dossierVaroHosidias = {
  id: "01a0d5f6-a299-786c-acc2-4cfb08eb833c",
  type: "page-type/temper-lore-book",
  slug: "dossier-varo-hosidias",
  title: "Dossier: Varo Hosidias",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5294,
  bookIndex: 81,
  charted: true,
  quest: 6266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
