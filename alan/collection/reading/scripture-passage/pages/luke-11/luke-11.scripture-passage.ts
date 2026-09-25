import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke11 = {
  id: "01a06804-11ae-70cd-af90-fcfe8073913c",
  type: "page-type/scripture-passage",
  slug: "luke-11",
  title: "Luke 11",
  partOfCollections: ["scripture-collection/luke"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke11",
} as const satisfies ScripturePassage
