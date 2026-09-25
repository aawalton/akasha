import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sardoksBloodthornReport = {
  id: "01a0d5f2-253b-712d-96ad-b385bf13cd7b",
  type: "page-type/temper-lore-book",
  slug: "sardoks-bloodthorn-report",
  title: "Sardok's Bloodthorn Report",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2463,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
