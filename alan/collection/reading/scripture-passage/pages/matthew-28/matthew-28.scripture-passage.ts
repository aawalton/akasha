import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew28 = {
  id: "01a06804-11af-703c-9b00-94e32325b00f",
  type: "page-type/scripture-passage",
  slug: "matthew-28",
  title: "Matthew 28",
  partOfCollections: ["scripture-collection/matthew"],
  position: 28,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew28",
} as const satisfies ScripturePassage
