import type { ModelTestOutcome } from "../model-test-outcome.page-type.ts"

export const positiveFalse = {
  id: "01a05905-af3c-7707-a3ee-1778e0a94d9c",
  pageTypeSlug: "model-test-outcome",
  slug: "positive-false",
  definition: "a case the test flagged that is not bad",
} as const satisfies ModelTestOutcome
