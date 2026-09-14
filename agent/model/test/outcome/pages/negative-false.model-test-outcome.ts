import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const negativeFalse = {
  id: "01a05905-af40-7665-8856-0c886ca80720",
  type: "model-test-outcome",
  slug: "negative-false",
  definition: "a case the test passed that is bad",
} as const satisfies ModelTestOutcome
