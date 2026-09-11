import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passages/scripture-passage.page-type.types.ts"

export const job1 = {
  id: "01a06804-11ae-7035-8379-e1146ce666ff",
  type: "scripture-passage",
  slug: "job-1",
  title: "Job 1",
  book: "Job",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "job1",
} as const satisfies ScripturePassage
