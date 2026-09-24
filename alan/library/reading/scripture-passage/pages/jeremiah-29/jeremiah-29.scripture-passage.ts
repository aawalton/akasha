import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const jeremiah29 = {
  id: "01a06804-11ae-7016-81cd-c9abc65f6504",
  type: "page-type/scripture-passage",
  slug: "jeremiah-29",
  title: "Jeremiah 29",
  partOfCollections: ["scripture-collection/jeremiah"],
  book: "Jeremiah",
  position: 29,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jeremiah29",
} as const satisfies ScripturePassage
