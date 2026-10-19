import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const positiveTruthy = {
  id: "01a05905-af3a-7d10-864d-cdafae5669cc",
  type: "page-type/model-test-outcome",
  slug: "positive-truthy",
  definition: "a rejection of a case that breaks another rule",
  createdAt: "2026-08-31T18:12:19.898Z",
  updatedAt: "2026-10-19T19:30:37.840Z",
} as const satisfies ModelTestOutcome
