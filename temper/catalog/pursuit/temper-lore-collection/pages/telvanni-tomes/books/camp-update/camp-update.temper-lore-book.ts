import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const campUpdate = {
  id: "01a0d60c-eb9a-7491-9e41-322b9e59a67e",
  type: "page-type/temper-lore-book",
  slug: "camp-update",
  title: "Camp Update",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7697,
  bookIndex: 23,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
