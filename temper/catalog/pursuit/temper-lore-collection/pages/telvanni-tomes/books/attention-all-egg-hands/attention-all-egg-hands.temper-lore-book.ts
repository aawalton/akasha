import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const attentionAllEggHands = {
  id: "01a0d60c-eb9a-7209-baa2-878ba0254e1b",
  type: "page-type/temper-lore-book",
  slug: "attention-all-egg-hands",
  title: "Attention All Egg-Hands",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7678,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
