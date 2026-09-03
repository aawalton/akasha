import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const noHardcodedSurface = {
  id: "01a06810-92ff-71db-9c17-97bb627b853e",
  pageTypeSlug: "cluster-check",
  slug: "no-hardcoded-surface",
  definition:
    "the check refusing a surface background class written as a literal rather than through surfaceClass",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
  treeSha: true,
} as const satisfies ClusterCheck
