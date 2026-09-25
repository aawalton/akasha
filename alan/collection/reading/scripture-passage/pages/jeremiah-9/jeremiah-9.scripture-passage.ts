import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const jeremiah9 = {
  id: "01a06804-11ae-7034-9bfc-10a63d2ae699",
  type: "page-type/scripture-passage",
  slug: "jeremiah-9",
  title: "Jeremiah 9",
  partOfCollections: ["scripture-collection/jeremiah"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jeremiah9",
} as const satisfies ScripturePassage
