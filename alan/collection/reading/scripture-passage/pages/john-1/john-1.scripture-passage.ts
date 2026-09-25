import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john1 = {
  id: "01a06804-11ae-7062-b939-3d935dbf910b",
  type: "page-type/scripture-passage",
  slug: "john-1",
  title: "John 1",
  partOfCollections: ["scripture-collection/john"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john1",
} as const satisfies ScripturePassage
