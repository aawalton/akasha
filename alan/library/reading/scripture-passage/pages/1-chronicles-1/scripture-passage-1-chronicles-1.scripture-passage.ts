import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Chronicles1 = {
  id: "01a06804-11a8-7000-a11f-8834ae90b726",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-chronicles-1",
  title: "1 Chronicles 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-chronicles"],
  book: "1 Chronicles",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1chronicles1",
} as const satisfies ScripturePassage
