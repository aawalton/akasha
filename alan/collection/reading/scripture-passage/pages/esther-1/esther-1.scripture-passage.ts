import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const esther1 = {
  id: "01a06804-11ac-700d-bf25-a7490587190b",
  type: "page-type/scripture-passage",
  slug: "esther-1",
  title: "Esther 1",
  partOfCollections: ["scripture-collection/esther"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "esther1",
} as const satisfies ScripturePassage
