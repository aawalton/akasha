import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfMelusMarsicus = {
  id: "01a0d60d-4aaf-7d98-a200-2aa3aae8aa77",
  type: "page-type/temper-lore-book",
  slug: "journal-of-melus-marsicus",
  title: "Journal of Melus Marsicus",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8049,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
