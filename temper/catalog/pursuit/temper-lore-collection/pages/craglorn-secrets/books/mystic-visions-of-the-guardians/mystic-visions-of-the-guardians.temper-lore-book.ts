import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysticVisionsOfTheGuardians = {
  id: "01a0d5f1-c91a-7df6-8845-233d3af14a49",
  type: "page-type/temper-lore-book",
  slug: "mystic-visions-of-the-guardians",
  title: "Mystic Visions of the Guardians",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2607,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
