import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const healthkitReadOnly = {
  id: "01a06810-92fe-79e3-accf-3d5543785d43",
  pageTypeSlug: "cluster-check",
  slug: "healthkit-read-only",
  definition:
    "the check refusing a HealthKit authorization request passing a toShare list that is not empty",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "sh-file" }],
} as const satisfies ClusterCheck
