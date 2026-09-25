import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToEthrandora = {
  id: "01a0d5f7-aa99-77fa-8665-a17d12c3c1c7",
  type: "page-type/temper-lore-book",
  slug: "ode-to-ethrandora",
  title: "Ode to Ethrandora",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4107,
  charted: true,
  quest: 5799,
  positions: "jsonl",
} as const satisfies TemperLoreBook
