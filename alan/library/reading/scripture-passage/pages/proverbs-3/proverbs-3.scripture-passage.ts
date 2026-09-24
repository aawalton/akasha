import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const proverbs3 = {
  id: "01a06804-11b0-701d-91ac-2e3311ebbf08",
  type: "page-type/scripture-passage",
  slug: "proverbs-3",
  title: "Proverbs 3",
  partOfCollections: ["scripture-collection/proverbs"],
  book: "Proverbs",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "proverbs3",
} as const satisfies ScripturePassage
