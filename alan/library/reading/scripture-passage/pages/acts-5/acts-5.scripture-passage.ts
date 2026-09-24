import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const acts5 = {
  id: "01a06804-11ab-700d-be90-8bc43d3b4f53",
  type: "page-type/scripture-passage",
  slug: "acts-5",
  title: "Acts 5",
  partOfCollections: ["scripture-collection/acts"],
  book: "Acts",
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "acts5",
} as const satisfies ScripturePassage
