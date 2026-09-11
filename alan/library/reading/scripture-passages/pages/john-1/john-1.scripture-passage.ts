import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passages/scripture-passage.page-type.types.ts"

export const john1 = {
  id: "01a06804-11ae-7062-b939-3d935dbf910b",
  type: "scripture-passage",
  slug: "john-1",
  title: "John 1",
  book: "John",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "john1",
} as const satisfies ScripturePassage
