import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onDremoraClans = {
  id: "01a0d60c-40c0-708e-9762-798ac1db5717",
  type: "page-type/temper-lore-book",
  slug: "on-dremora-clans",
  title: "On Dremora Clans",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6709,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
