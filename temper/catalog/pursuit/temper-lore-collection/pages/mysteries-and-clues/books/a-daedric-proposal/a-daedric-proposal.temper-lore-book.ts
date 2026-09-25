import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDaedricProposal = {
  id: "01a0d5f4-07b6-7617-848b-a622d0130c35",
  type: "page-type/temper-lore-book",
  slug: "a-daedric-proposal",
  title: "A Daedric Proposal",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5961,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
