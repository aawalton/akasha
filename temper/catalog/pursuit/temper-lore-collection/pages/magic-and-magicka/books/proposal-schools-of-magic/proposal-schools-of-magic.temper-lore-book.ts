import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const proposalSchoolsOfMagic = {
  id: "01a0d5e3-fde3-7333-bc1f-1cb229a017b9",
  type: "page-type/temper-lore-book",
  slug: "proposal-schools-of-magic",
  title: "Proposal: Schools of Magic",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
