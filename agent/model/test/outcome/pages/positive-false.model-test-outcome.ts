import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const positiveFalse = {
  id: "01a05905-af3c-7707-a3ee-1778e0a94d9c",
  type: "page-type/model-test-outcome",
  slug: "positive-false",
  definition: "a rejection of a case that breaks no rule",
  createdAt: "2026-08-31T18:12:19.900Z",
  updatedAt: "2026-10-19T19:30:26.802Z",
} as const satisfies ModelTestOutcome
