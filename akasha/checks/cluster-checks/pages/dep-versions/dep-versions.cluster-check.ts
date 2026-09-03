import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const depVersions = {
  id: "01a06810-92fe-7f0d-bc98-3d1ec8049de6",
  pageTypeSlug: "cluster-check",
  slug: "dep-versions",
  definition: "the check refusing a dependency held to an exact version that carries a range",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
} as const satisfies ClusterCheck
