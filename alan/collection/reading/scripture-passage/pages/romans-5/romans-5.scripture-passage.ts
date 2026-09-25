import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans5 = {
  id: "01a06804-11b1-702f-a67d-25dafec29d40",
  type: "page-type/scripture-passage",
  slug: "romans-5",
  title: "Romans 5",
  partOfCollections: ["scripture-collection/romans"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans5",
} as const satisfies ScripturePassage
