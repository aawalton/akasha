import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const sections123 = {
  id: "01a06804-11b1-7053-a3fd-ba77261f3ae8",
  type: "page-type/scripture-passage",
  slug: "sections-123",
  title: "Sections 123",
  partOfCollections: ["scripture-collection/sections"],
  book: "Sections",
  position: 123,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "doctrineandcovenants123",
} as const satisfies ScripturePassage
