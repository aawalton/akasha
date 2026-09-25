import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const magesGuildAuthorization = {
  id: "01a0d5f2-db26-7061-a0bc-5cef75e9c88b",
  type: "page-type/temper-lore-book",
  slug: "mages-guild-authorization",
  title: "Mages Guild Authorization",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1787,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
