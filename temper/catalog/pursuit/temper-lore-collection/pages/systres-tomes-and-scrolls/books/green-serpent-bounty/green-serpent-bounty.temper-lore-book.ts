import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greenSerpentBounty = {
  id: "01a0d60c-75b5-7fcd-867e-fce169a550c0",
  type: "page-type/temper-lore-book",
  slug: "green-serpent-bounty",
  title: "Green Serpent Bounty",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7114,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
