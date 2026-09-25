import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSkySpirits = {
  id: "01a0d60b-4e03-71af-9494-e341260f72fa",
  type: "page-type/temper-lore-book",
  slug: "the-sky-spirits",
  title: "The Sky Spirits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5725,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
