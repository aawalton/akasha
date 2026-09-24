import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra9 = {
  id: "01a06804-11ad-7009-babd-74ebdeed2023",
  type: "page-type/scripture-passage",
  slug: "ezra-9",
  title: "Ezra 9",
  partOfCollections: ["scripture-collection/ezra"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra9",
} as const satisfies ScripturePassage
