import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const healthSamplesStream = {
  id: "01a06810-92fe-776c-9b70-cfb5c86bb27a",
  pageTypeSlug: "cluster-check",
  slug: "health-samples-stream",
  definition:
    "the check refusing a health-sample drain advancing its cursor outside the upload's success arm",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "sh-file" }],
} as const satisfies ClusterCheck
