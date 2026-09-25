import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAffairWithDeath = {
  id: "01a0d5f5-1383-74a0-8071-09625583a591",
  type: "page-type/temper-lore-book",
  slug: "an-affair-with-death",
  title: "An Affair with Death",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 929,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
