import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const guardedResolve = {
  id: "01a06810-92fe-7391-b957-972973b1f1bd",
  pageTypeSlug: "cluster-check",
  slug: "guarded-resolve",
  definition: "the check refusing an existsSync guard that skips work over a path git tracks",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
} as const satisfies ClusterCheck
