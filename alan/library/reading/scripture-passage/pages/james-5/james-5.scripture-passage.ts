import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const james5 = {
  id: "01a06804-11ae-7000-aebf-16a553199dae",
  type: "page-type/scripture-passage",
  slug: "james-5",
  title: "James 5",
  partOfCollections: ["scripture-collection/james"],
  book: "James",
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "james5",
} as const satisfies ScripturePassage
