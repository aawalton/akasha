import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezekiel1 = {
  id: "01a06804-11ac-703f-ad3f-dce80e6f40ba",
  type: "page-type/scripture-passage",
  slug: "ezekiel-1",
  title: "Ezekiel 1",
  partOfCollections: ["scripture-collection/ezekiel"],
  book: "Ezekiel",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezekiel1",
} as const satisfies ScripturePassage
