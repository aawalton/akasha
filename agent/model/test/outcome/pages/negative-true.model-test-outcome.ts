import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const negativeTrue = {
  id: "01a05905-af3e-7046-b63f-021aec690eef",
  type: "page-type/model-test-outcome",
  slug: "negative-true",
  definition: "a pass of a case that breaks no rule",
  createdAt: "2026-08-31T18:12:19.902Z",
  updatedAt: "2026-10-19T19:30:21.432Z",
} as const satisfies ModelTestOutcome
