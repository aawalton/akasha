import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const acyclicPackages = {
  id: "01a06810-92fc-7214-9ecd-16fb610e2cbd",
  pageTypeSlug: "cluster-check",
  slug: "acyclic-packages",
  definition: "the check refusing a workspace package that depends its way back around to itself",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
  treeSha: true,
} as const satisfies ClusterCheck
