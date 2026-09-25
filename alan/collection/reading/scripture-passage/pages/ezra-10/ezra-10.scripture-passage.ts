import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra10 = {
  id: "01a06804-11ad-7001-9a73-e2b2bccf660f",
  type: "page-type/scripture-passage",
  slug: "ezra-10",
  title: "Ezra 10",
  partOfCollections: ["scripture-collection/ezra"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra10",
} as const satisfies ScripturePassage
