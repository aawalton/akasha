import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passages/scripture-passage.page-type.types.ts"

export const psalms95 = {
  id: "01a06804-11b1-7009-83dc-9861d879d684",
  type: "scripture-passage",
  slug: "psalms-95",
  title: "Psalms 95",
  book: "Psalms",
  position: 95,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms95",
} as const satisfies ScripturePassage
