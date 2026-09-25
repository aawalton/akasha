import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToThaneOgvar = {
  id: "01a0d60b-8108-7bf9-9c2c-c9aa3d81b260",
  type: "page-type/temper-lore-book",
  slug: "letter-to-thane-ogvar",
  title: "Letter to Thane Ogvar",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5945,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
