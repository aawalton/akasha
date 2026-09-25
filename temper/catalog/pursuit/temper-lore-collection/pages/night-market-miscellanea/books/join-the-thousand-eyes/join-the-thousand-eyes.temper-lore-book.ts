import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinTheThousandEyes = {
  id: "01a0d60e-687f-773e-8488-c2ca6d2e7177",
  type: "page-type/temper-lore-book",
  slug: "join-the-thousand-eyes",
  title: "Join the Thousand Eyes",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8747,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
