import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms90 = {
  id: "01a06804-11b1-7004-894a-a8cf9b6f4169",
  type: "page-type/scripture-passage",
  slug: "psalms-90",
  title: "Psalms 90",
  partOfCollections: ["scripture-collection/psalms"],
  position: 90,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms90",
  createdAt: "2026-09-03T16:04:52.273Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
