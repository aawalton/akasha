import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaElfAmbassador = {
  id: "01a0d60d-ff6a-7a7c-b9cb-6ad523fa6bc5",
  type: "page-type/temper-lore-book",
  slug: "the-sea-elf-ambassador",
  title: "The Sea Elf Ambassador",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8288,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
