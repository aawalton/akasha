import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialsOfHissmir = {
  id: "01a0d5f5-444d-7ee7-9e2b-cdc54fa67840",
  type: "page-type/temper-lore-book",
  slug: "the-trials-of-hissmir",
  title: "The Trials of Hissmir",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 748,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
