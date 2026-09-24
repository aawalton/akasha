import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Peter1 = {
  id: "01a06804-11aa-701b-b0d2-672c386071d1",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-peter-1",
  title: "2 Peter 1",
  partOfCollections: ["scripture-collection/scripture-collection-2-peter"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2peter1",
} as const satisfies ScripturePassage
