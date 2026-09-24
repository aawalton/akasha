import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const job2 = {
  id: "01a06804-11ae-7040-a0ff-fcb4f9ed2c7a",
  type: "page-type/scripture-passage",
  slug: "job-2",
  title: "Job 2",
  partOfCollections: ["scripture-collection/job"],
  book: "Job",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "job2",
} as const satisfies ScripturePassage
