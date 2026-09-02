import type { ModelTestOutcome } from "../model-test-outcome.page-type.ts"

export const negativeFalse = {
  id: "01a05905-af40-7665-8856-0c886ca80720",
  pageTypeSlug: "model-test-outcome",
  slug: "negative-false",
  definition: "a case the test passed that is bad",
} as const satisfies ModelTestOutcome
