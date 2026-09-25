import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms43 = {
  id: "01a06804-11b0-707b-b81c-c8c8cdb834b6",
  type: "page-type/scripture-passage",
  slug: "psalms-43",
  title: "Psalms 43",
  partOfCollections: ["scripture-collection/psalms"],
  position: 43,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms43",
} as const satisfies ScripturePassage
