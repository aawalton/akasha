import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riteOfTheftSong = {
  id: "01a0d60d-4ab0-7428-9bab-c2b70e1aa9f8",
  type: "page-type/temper-lore-book",
  slug: "rite-of-theft-song",
  title: "Rite of Theft Song",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8138,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
