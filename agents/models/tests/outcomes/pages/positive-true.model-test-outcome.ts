import type { ModelTestOutcome } from "../model-test-outcome.page-type.ts"

export const positiveTrue = {
  id: "01a05905-af38-741e-87f4-ec98aebe9361",
  pageTypeSlug: "model-test-outcome",
  slug: "positive-true",
  definition: "a case the test flagged that is bad in the way the test measures",
} as const satisfies ModelTestOutcome
