import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const summoningRitualsLegible = {
  id: "01a0d5f5-444c-743b-80a1-41788501f30e",
  type: "page-type/temper-lore-book",
  slug: "summoning-rituals-legible",
  title: "Summoning Rituals (Legible)",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 121,
  bookIndex: 7,
  charted: true,
  quest: 3916,
  positions: "jsonl",
} as const satisfies TemperLoreBook
