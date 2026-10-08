import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms13 = {
  id: "01a06804-11b0-7047-8a8b-e7a6f5711d8d",
  type: "page-type/scripture-passage",
  slug: "psalms-13",
  title: "Psalms 13",
  partOfCollections: ["scripture-collection/psalms"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms13",
  createdAt: "2026-09-03T16:04:52.272Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
