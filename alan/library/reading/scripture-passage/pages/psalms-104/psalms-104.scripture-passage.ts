import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms104 = {
  id: "01a06804-11b0-702b-8a6a-6c9fee015bec",
  type: "page-type/scripture-passage",
  slug: "psalms-104",
  title: "Psalms 104",
  partOfCollections: ["scripture-collection/psalms"],
  position: 104,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms104",
} as const satisfies ScripturePassage
