import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const porcelainStatusBoundary = {
  id: "01a06810-92ff-781e-b9e8-61aaaff6346b",
  pageTypeSlug: "cluster-check",
  slug: "porcelain-status-boundary",
  definition:
    "the check refusing git status machine output read outside the shared porcelain module",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }, { nodeKind: "sh-file" }],
} as const satisfies ClusterCheck
