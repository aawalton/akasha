import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra3 = {
  id: "01a06804-11ad-7003-bc7d-ac28b4554d89",
  type: "page-type/scripture-passage",
  slug: "ezra-3",
  title: "Ezra 3",
  partOfCollections: ["scripture-collection/ezra"],
  book: "Ezra",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra3",
} as const satisfies ScripturePassage
