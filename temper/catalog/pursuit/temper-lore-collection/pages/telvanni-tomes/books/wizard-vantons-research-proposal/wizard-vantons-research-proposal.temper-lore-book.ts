import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wizardVantonsResearchProposal = {
  id: "01a0d60c-eb9c-7424-a690-f51bbd9a8175",
  type: "page-type/temper-lore-book",
  slug: "wizard-vantons-research-proposal",
  title: "Wizard Vanton's Research Proposal",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7591,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
