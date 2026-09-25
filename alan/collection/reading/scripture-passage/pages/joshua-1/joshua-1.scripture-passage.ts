import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const joshua1 = {
  id: "01a06804-11ae-707d-baf0-fe0bdd592fbe",
  type: "page-type/scripture-passage",
  slug: "joshua-1",
  title: "Joshua 1",
  partOfCollections: ["scripture-collection/joshua"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "joshua1",
} as const satisfies ScripturePassage
