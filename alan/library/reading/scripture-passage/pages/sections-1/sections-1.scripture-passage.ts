import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const sections1 = {
  id: "01a06804-11b1-7038-8132-d100cde556c9",
  type: "page-type/scripture-passage",
  slug: "sections-1",
  title: "Sections 1",
  partOfCollections: ["scripture-collection/sections"],
  book: "Sections",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "doctrineandcovenants1",
} as const satisfies ScripturePassage
