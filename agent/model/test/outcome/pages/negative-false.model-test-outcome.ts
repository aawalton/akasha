import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const negativeFalse = {
  id: "01a05905-af40-7665-8856-0c886ca80720",
  type: "page-type/model-test-outcome",
  slug: "negative-false",
  definition: "a pass of a case that breaks a rule",
  createdAt: "2026-08-31T18:12:19.904Z",
  updatedAt: "2026-10-19T19:30:16.091Z",
} as const satisfies ModelTestOutcome
