import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms12 = {
  id: "01a06804-11b0-703c-aa64-0a010fcdfd07",
  type: "page-type/scripture-passage",
  slug: "psalms-12",
  title: "Psalms 12",
  partOfCollections: ["scripture-collection/psalms"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms12",
} as const satisfies ScripturePassage
