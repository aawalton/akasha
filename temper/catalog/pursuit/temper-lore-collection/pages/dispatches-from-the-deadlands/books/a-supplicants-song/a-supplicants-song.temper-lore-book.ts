import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSupplicantsSong = {
  id: "01a0d60c-40bf-790c-a325-cc9b26358584",
  type: "page-type/temper-lore-book",
  slug: "a-supplicants-song",
  title: "A Supplicant's Song",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6586,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
