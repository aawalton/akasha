import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const verdictEmitterChokepoint = {
  id: "01a06810-9300-7c17-9c81-634d8eddc8d0",
  pageTypeSlug: "cluster-check",
  slug: "verdict-emitter-chokepoint",
  definition:
    "the check refusing a check script printing its verdict rather than handing it to the reporter",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "infra/cluster-checks/src/checks" }],
} as const satisfies ClusterCheck
