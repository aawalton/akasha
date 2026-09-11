import type { ModelTestOutcome } from "akasha/agents/models/tests/outcomes/model-test-outcome.page-type.types.ts"

export const negativeTrue = {
  id: "01a05905-af3e-7046-b63f-021aec690eef",
  type: "model-test-outcome",
  slug: "negative-true",
  definition: "a case the test passed that is not bad",
} as const satisfies ModelTestOutcome
