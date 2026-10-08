import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms95 = {
  id: "01a06804-11b1-7009-83dc-9861d879d684",
  type: "page-type/scripture-passage",
  slug: "psalms-95",
  title: "Psalms 95",
  partOfCollections: ["scripture-collection/psalms"],
  position: 95,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms95",
  createdAt: "2026-09-03T16:04:52.273Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
