import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const monstersOfNorthernFolklore = {
  id: "01a0d60b-8108-7abb-abf5-776ce5911e1a",
  type: "page-type/temper-lore-book",
  slug: "monsters-of-northern-folklore",
  title: "Monsters of Northern Folklore",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6055,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
