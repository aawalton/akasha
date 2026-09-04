import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const tsconfig = {
  id: "01a06810-9300-7271-930f-7cb14c85504d",
  pageTypeSlug: "cluster-check",
  slug: "tsconfig",
  definition:
    "the check refusing a workspace tsconfig that departs from the conventions its package type sets",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }, { nodeKind: "json-file" }],
  alwaysRun: true,
  treeSha: true,
} as const satisfies ClusterCheck
