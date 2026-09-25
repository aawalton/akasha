import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Kings1 = {
  id: "01a06804-11a8-7032-9ecf-38b7ec0de326",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-kings-1",
  title: "1 Kings 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-kings"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1kings1",
} as const satisfies ScripturePassage
