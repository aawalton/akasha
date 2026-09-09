import type { Domain } from "../../domains/domain.page-type.ts"

export const analysisComplexity = {
  id: "01a0680f-d1b7-7a4f-9195-8a87f5f16534",
  pageTypeSlug: "domain",
  slug: "analysis-complexity",
  definition: "how complex the TypeScript in a checkout measures",
  parts: [
    "module/complexity-rows",
    "module/cyclomatic",
    "module/file-discovery",
    "module/halstead",
    "module/maintainability",
    "module/operator-classification",
    "module/walk-functions",
  ],
} as const satisfies Domain
