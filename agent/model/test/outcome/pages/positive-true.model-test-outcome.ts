import type { ModelTestOutcome } from "akasha/agent/model/test/outcome/model-test-outcome.page-type.types.ts"

export const positiveTrue = {
  id: "01a05905-af38-741e-87f4-ec98aebe9361",
  type: "page-type/model-test-outcome",
  slug: "positive-true",
  definition: "a rejection of a case that breaks a rule",
  createdAt: "2026-08-31T18:12:19.896Z",
  updatedAt: "2026-10-19T19:30:32.402Z",
} as const satisfies ModelTestOutcome
