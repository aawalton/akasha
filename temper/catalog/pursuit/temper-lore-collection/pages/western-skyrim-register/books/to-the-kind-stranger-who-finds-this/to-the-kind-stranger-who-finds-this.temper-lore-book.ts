import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTheKindStrangerWhoFindsThis = {
  id: "01a0d60b-a362-713a-aca7-b83235e7de64",
  type: "page-type/temper-lore-book",
  slug: "to-the-kind-stranger-who-finds-this",
  title: "To the Kind Stranger Who Finds This",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6119,
  bookIndex: 26,
  charted: true,
  quest: 6538,
  positions: "jsonl",
} as const satisfies TemperLoreBook
