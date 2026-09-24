import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew5 = {
  id: "01a06804-11af-703f-bea1-ae869337ef24",
  type: "page-type/scripture-passage",
  slug: "matthew-5",
  title: "Matthew 5",
  partOfCollections: ["scripture-collection/matthew"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew5",
} as const satisfies ScripturePassage
