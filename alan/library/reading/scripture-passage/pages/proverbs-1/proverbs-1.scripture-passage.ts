import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const proverbs1 = {
  id: "01a06804-11b0-7007-bf59-98cb3dce4627",
  type: "page-type/scripture-passage",
  slug: "proverbs-1",
  title: "Proverbs 1",
  partOfCollections: ["scripture-collection/proverbs"],
  book: "Proverbs",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "proverbs1",
} as const satisfies ScripturePassage
