import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfFire = {
  id: "01a0d5f1-c91b-7881-bc8f-ecf5e41dad9e",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-fire",
  title: "The Trial of Fire",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2375,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
