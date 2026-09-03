import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const packageNames = {
  id: "01a06810-92ff-7c28-89e1-fbb70311c620",
  pageTypeSlug: "cluster-check",
  slug: "package-names",
  definition: "the check refusing a workspace whose package name does not match its directory path",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
} as const satisfies ClusterCheck
