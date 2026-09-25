import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missiveFromTheMagesGuild = {
  id: "01a0d5f3-0ef8-7969-9be6-2b386f66cc8f",
  type: "page-type/temper-lore-book",
  slug: "missive-from-the-mages-guild",
  title: "Missive from the Mages Guild",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1205,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
