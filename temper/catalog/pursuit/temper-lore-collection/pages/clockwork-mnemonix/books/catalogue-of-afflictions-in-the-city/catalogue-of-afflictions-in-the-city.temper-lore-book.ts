import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const catalogueOfAfflictionsInTheCity = {
  id: "01a0d60a-a213-7a2b-9645-341ac00a96bd",
  type: "page-type/temper-lore-book",
  slug: "catalogue-of-afflictions-in-the-city",
  title: "Catalogue of Afflictions in the City",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4725,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
