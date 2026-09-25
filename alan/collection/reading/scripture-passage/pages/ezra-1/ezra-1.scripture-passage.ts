import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra1 = {
  id: "01a06804-11ad-7000-a105-9cf74274d083",
  type: "page-type/scripture-passage",
  slug: "ezra-1",
  title: "Ezra 1",
  partOfCollections: ["scripture-collection/ezra"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra1",
} as const satisfies ScripturePassage
