import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john5 = {
  id: "01a06804-11ae-7072-a9bb-9a92438e5c9a",
  type: "page-type/scripture-passage",
  slug: "john-5",
  title: "John 5",
  partOfCollections: ["scripture-collection/john"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john5",
} as const satisfies ScripturePassage
