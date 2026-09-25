import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elovulAlarndilGravestone = {
  id: "01a0d60c-eb9b-760e-91de-5ae44532d549",
  type: "page-type/temper-lore-book",
  slug: "elovul-alarndil-gravestone",
  title: "Elovul Alarndil Gravestone",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7755,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
