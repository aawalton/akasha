import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke8 = {
  id: "01a06804-11af-7012-b32c-ee2c2764c6f6",
  type: "page-type/scripture-passage",
  slug: "luke-8",
  title: "Luke 8",
  partOfCollections: ["scripture-collection/luke"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke8",
} as const satisfies ScripturePassage
