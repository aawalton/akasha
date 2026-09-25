import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const jonah1 = {
  id: "01a06804-11ae-7077-8697-2d80ebb772a9",
  type: "page-type/scripture-passage",
  slug: "jonah-1",
  title: "Jonah 1",
  partOfCollections: ["scripture-collection/jonah"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jonah1",
} as const satisfies ScripturePassage
