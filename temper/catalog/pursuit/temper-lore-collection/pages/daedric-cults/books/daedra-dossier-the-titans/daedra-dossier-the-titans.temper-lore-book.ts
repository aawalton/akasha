import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daedraDossierTheTitans = {
  id: "01a0d5f2-253a-7293-af73-8b9fb10f17a6",
  type: "page-type/temper-lore-book",
  slug: "daedra-dossier-the-titans",
  title: "Daedra Dossier: The Titans",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2758,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
