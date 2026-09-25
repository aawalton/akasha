import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToVaermina = {
  id: "01a0d60d-156e-7f7a-b80a-5469db43ac9c",
  type: "page-type/temper-lore-book",
  slug: "ode-to-vaermina",
  title: "Ode to Vaermina",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7419,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
