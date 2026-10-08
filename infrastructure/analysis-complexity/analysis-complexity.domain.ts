import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const analysisComplexity = {
  id: "01a0680f-d1b7-7a4f-9195-8a87f5f16534",
  type: "page-type/domain",
  slug: "analysis-complexity",
  definition: "how code measures the complexity of TypeScript",
  parts: [
    "module/complexity-rows",
    "module/cyclomatic",
    "module/file-discovery",
    "module/halstead",
    "module/maintainability",
    "module/operator-classification",
    "module/walk-functions",
  ],
  createdAt: "2026-09-03T16:17:42.327Z",
  updatedAt: "2026-09-25T16:18:57.000Z",
} as const satisfies Domain
