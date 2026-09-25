import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const holySweetrollLiturgy = {
  id: "01a0d60b-8107-78b3-bc28-2c2e8f659104",
  type: "page-type/temper-lore-book",
  slug: "holy-sweetroll-liturgy",
  title: "Holy Sweetroll Liturgy",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6234,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
