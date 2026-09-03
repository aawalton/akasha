import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const addonBuild = {
  id: "01a06810-92fd-7af3-ade2-a6e75a260314",
  pageTypeSlug: "cluster-check",
  slug: "addon-build",
  definition: "the check refusing a deployable addon that does not build",
  code: "ts",
  treeSha: true,
  resources: { requestMemory: "6Gi", limitMemory: "6Gi" },
  closurePolicy: "import-graph",
} as const satisfies ClusterCheck
