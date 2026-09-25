import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const daniel5 = {
  id: "01a06804-11ab-7027-a8bb-79a25bb00db2",
  type: "page-type/scripture-passage",
  slug: "daniel-5",
  title: "Daniel 5",
  partOfCollections: ["scripture-collection/daniel"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "daniel5",
} as const satisfies ScripturePassage
