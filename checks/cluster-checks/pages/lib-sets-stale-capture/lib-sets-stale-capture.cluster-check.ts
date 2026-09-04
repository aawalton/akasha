import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const libSetsStaleCapture = {
  id: "01a06810-92ff-7a20-bb43-9d9257c751d3",
  pageTypeSlug: "cluster-check",
  slug: "lib-sets-stale-capture",
  definition:
    "the check refusing a module-scope binding capturing a LibSets field rebound at runtime",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "temper" }],
} as const satisfies ClusterCheck
