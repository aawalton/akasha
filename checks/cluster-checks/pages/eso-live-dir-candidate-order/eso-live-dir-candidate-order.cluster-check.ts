import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const esoLiveDirCandidateOrder = {
  id: "01a06810-92fe-7d60-903d-04a22de760c3",
  pageTypeSlug: "cluster-check",
  slug: "eso-live-dir-candidate-order",
  definition:
    "the check refusing an ESO live folder probe that does not try the OneDrive path first",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "rust-file" }],
} as const satisfies ClusterCheck
