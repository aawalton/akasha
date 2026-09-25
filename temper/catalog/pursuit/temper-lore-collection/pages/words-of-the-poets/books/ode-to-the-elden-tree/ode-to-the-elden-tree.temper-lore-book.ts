import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToTheEldenTree = {
  id: "01a0d5f6-1c16-78bf-bd58-a73ed623d842",
  type: "page-type/temper-lore-book",
  slug: "ode-to-the-elden-tree",
  title: "Ode to the Elden Tree",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2129,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
