import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew13 = {
  id: "01a06804-11af-702c-8839-2ac2f9e39abd",
  type: "page-type/scripture-passage",
  slug: "matthew-13",
  title: "Matthew 13",
  partOfCollections: ["scripture-collection/matthew"],
  book: "Matthew",
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew13",
} as const satisfies ScripturePassage
