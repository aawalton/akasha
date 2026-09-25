import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToTheFounding = {
  id: "01a0d60b-8108-707e-bf12-9e39f2628769",
  type: "page-type/temper-lore-book",
  slug: "ode-to-the-founding",
  title: "Ode to the Founding",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6106,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
