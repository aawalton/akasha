import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bogvirsLetter = {
  id: "01a0d60d-4aae-7a5f-ba0d-31c661942bfa",
  type: "page-type/temper-lore-book",
  slug: "bogvirs-letter",
  title: "Bogvir's Letter",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8059,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
