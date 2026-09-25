import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms123 = {
  id: "01a06804-11b0-7040-aeac-991893b6ce02",
  type: "page-type/scripture-passage",
  slug: "psalms-123",
  title: "Psalms 123",
  partOfCollections: ["scripture-collection/psalms"],
  position: 123,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms123",
} as const satisfies ScripturePassage
