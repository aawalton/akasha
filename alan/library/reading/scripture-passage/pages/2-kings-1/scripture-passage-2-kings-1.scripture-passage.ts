import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Kings1 = {
  id: "01a06804-11aa-7002-b57a-e5efe19d7135",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-kings-1",
  title: "2 Kings 1",
  partOfCollections: ["scripture-collection/scripture-collection-2-kings"],
  book: "2 Kings",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2kings1",
} as const satisfies ScripturePassage
