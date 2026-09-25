import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Timothy3 = {
  id: "01a06804-11aa-703b-b8fe-54af906cfac6",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-timothy-3",
  title: "2 Timothy 3",
  partOfCollections: ["scripture-collection/scripture-collection-2-timothy"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2timothy3",
} as const satisfies ScripturePassage
