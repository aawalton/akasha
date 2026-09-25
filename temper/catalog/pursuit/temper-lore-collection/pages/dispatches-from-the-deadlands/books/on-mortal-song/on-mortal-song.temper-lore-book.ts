import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onMortalSong = {
  id: "01a0d60c-40c0-70e7-b63d-93637aebb5be",
  type: "page-type/temper-lore-book",
  slug: "on-mortal-song",
  title: "On Mortal Song",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6772,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
