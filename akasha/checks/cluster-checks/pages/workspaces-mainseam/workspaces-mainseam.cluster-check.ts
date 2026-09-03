import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const workspacesMainseam = {
  id: "01a06810-9300-7787-a06f-8465d1b1f410",
  pageTypeSlug: "cluster-check",
  slug: "workspaces-mainseam",
  definition: "the check refusing a workspaces entry that does not parse under the code on main",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
} as const satisfies ClusterCheck
