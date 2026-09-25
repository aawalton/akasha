import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const critterDangersTelvanniPeninsula = {
  id: "01a0d60c-eb9b-7821-8f37-610fac8ece98",
  type: "page-type/temper-lore-book",
  slug: "critter-dangers-telvanni-peninsula",
  title: "Critter Dangers: Telvanni Peninsula",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7442,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
