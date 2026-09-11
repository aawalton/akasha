import type { ModelTestOutcome } from "akasha/agents/models/tests/outcomes/model-test-outcome.page-type.types.ts"

export const positiveTruthy = {
  id: "01a05905-af3a-7d10-864d-cdafae5669cc",
  type: "model-test-outcome",
  slug: "positive-truthy",
  definition: "a case the test flagged that is bad in some other way",
} as const satisfies ModelTestOutcome
