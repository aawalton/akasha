import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ephesians1 = {
  id: "01a06804-11ac-7007-919e-46297ff26c55",
  type: "page-type/scripture-passage",
  slug: "ephesians-1",
  title: "Ephesians 1",
  partOfCollections: ["scripture-collection/ephesians"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ephesians1",
} as const satisfies ScripturePassage
