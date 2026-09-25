import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ruth1 = {
  id: "01a06804-11b1-7034-80d7-09721c4553fe",
  type: "page-type/scripture-passage",
  slug: "ruth-1",
  title: "Ruth 1",
  partOfCollections: ["scripture-collection/ruth"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ruth1",
} as const satisfies ScripturePassage
