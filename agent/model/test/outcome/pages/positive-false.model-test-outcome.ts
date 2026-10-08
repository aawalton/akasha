import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const positiveFalse = {
  id: "01a05905-af3c-7707-a3ee-1778e0a94d9c",
  type: "page-type/model-test-outcome",
  slug: "positive-false",
  definition: "a case the test flagged that is not bad",
  createdAt: "2026-08-31T18:12:19.900Z",
  updatedAt: "2026-09-15T17:28:59.000Z",
} as const satisfies ModelTestOutcome
