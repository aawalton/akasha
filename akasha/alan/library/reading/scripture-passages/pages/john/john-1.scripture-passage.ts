import type { ScripturePassage } from "../../scripture-passage.page-type.ts"

export const john1 = {
  id: "01a06804-11ae-7062-b939-3d935dbf910b",
  pageTypeSlug: "scripture-passage",
  slug: "john-1",
  title: "John 1",
  book: "John",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "john1",
} as const satisfies ScripturePassage
