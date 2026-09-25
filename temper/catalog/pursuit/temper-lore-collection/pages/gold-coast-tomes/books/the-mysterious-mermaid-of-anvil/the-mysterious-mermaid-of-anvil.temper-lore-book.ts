import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMysteriousMermaidOfAnvil = {
  id: "01a0d5f7-73fb-77ce-9082-c86326698ba2",
  type: "page-type/temper-lore-book",
  slug: "the-mysterious-mermaid-of-anvil",
  title: "The Mysterious Mermaid of Anvil",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3703,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
