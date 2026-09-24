import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke6 = {
  id: "01a06804-11af-7010-8c68-58eff0314a52",
  type: "page-type/scripture-passage",
  slug: "luke-6",
  title: "Luke 6",
  partOfCollections: ["scripture-collection/luke"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke6",
} as const satisfies ScripturePassage
