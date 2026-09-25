import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john12 = {
  id: "01a06804-11ae-7065-86a3-b9dd1da53d32",
  type: "page-type/scripture-passage",
  slug: "john-12",
  title: "John 12",
  partOfCollections: ["scripture-collection/john"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john12",
} as const satisfies ScripturePassage
