import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const negativeFalse = {
  id: "01a05905-af40-7665-8856-0c886ca80720",
  type: "page-type/model-test-outcome",
  slug: "negative-false",
  definition: "a case the test passed that is bad",
  createdAt: "2026-08-31T18:12:19.904Z",
  updatedAt: "2026-09-15T17:28:59.000Z",
} as const satisfies ModelTestOutcome
