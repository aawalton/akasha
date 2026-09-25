import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew10 = {
  id: "01a06804-11af-7029-a6fb-409612ac8433",
  type: "page-type/scripture-passage",
  slug: "matthew-10",
  title: "Matthew 10",
  partOfCollections: ["scripture-collection/matthew"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew10",
} as const satisfies ScripturePassage
