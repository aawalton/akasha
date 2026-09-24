import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Kings2 = {
  id: "01a06804-11a9-7006-b95f-a59fb5cbeb59",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-kings-2",
  title: "1 Kings 2",
  partOfCollections: ["scripture-collection/scripture-collection-1-kings"],
  book: "1 Kings",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1kings2",
} as const satisfies ScripturePassage
