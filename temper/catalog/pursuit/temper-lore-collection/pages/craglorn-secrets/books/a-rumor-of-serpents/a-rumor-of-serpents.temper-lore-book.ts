import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aRumorOfSerpents = {
  id: "01a0d5f1-c919-7e19-b290-60095aa7802a",
  type: "page-type/temper-lore-book",
  slug: "a-rumor-of-serpents",
  title: "A Rumor of Serpents",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2725,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
