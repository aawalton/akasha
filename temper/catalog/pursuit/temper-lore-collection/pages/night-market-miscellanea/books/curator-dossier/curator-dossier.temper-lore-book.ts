import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const curatorDossier = {
  id: "01a0d60e-687e-7fab-97ec-4f214973cde0",
  type: "page-type/temper-lore-book",
  slug: "curator-dossier",
  title: "Curator Dossier",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8736,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
