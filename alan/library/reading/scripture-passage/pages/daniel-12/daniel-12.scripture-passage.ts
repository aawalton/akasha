import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const daniel12 = {
  id: "01a06804-11ab-7023-8228-7232081e8763",
  type: "page-type/scripture-passage",
  slug: "daniel-12",
  title: "Daniel 12",
  partOfCollections: ["scripture-collection/daniel"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "daniel12",
} as const satisfies ScripturePassage
