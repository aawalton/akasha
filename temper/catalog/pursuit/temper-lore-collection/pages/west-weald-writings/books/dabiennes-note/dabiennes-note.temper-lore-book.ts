import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dabiennesNote = {
  id: "01a0d60d-4aaf-7aae-9e29-09aeac1cbda7",
  type: "page-type/temper-lore-book",
  slug: "dabiennes-note",
  title: "Dabienne's Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8129,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
