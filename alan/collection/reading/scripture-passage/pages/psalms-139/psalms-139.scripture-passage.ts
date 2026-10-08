import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms139 = {
  id: "01a06804-11b0-7050-8a5c-6ba6dc9bb0b5",
  type: "page-type/scripture-passage",
  slug: "psalms-139",
  title: "Psalms 139",
  partOfCollections: ["scripture-collection/psalms"],
  position: 139,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms139",
  createdAt: "2026-09-03T16:04:52.272Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
