import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldSnagaraBreedingGuide = {
  id: "01a0d5f6-d68b-71ea-baac-f299f608c8bf",
  type: "page-type/temper-lore-book",
  slug: "old-snagara-breeding-guide",
  title: "Old Snagara Breeding Guide",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3173,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
