import type { ModelTestOutcome } from "../model-test-outcome.page-type.ts"

export const positiveTruthy = {
  id: "01a05905-af3a-7d10-864d-cdafae5669cc",
  pageTypeSlug: "model-test-outcome",
  slug: "positive-truthy",
  definition: "a case the test flagged that is bad in some other way",
} as const satisfies ModelTestOutcome
