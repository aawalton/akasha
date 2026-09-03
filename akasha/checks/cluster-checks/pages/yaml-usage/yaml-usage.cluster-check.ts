import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const yamlUsage = {
  id: "01a06810-9300-7450-a3aa-6c3840232de6",
  pageTypeSlug: "cluster-check",
  slug: "yaml-usage",
  definition: "the check refusing a YAML file no source file references",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "yaml-file" }, { nodeKind: "yml-file" }],
  alwaysRun: true,
  treeSha: true,
  resources: { requestMemory: "1Gi", limitMemory: "2Gi" },
} as const satisfies ClusterCheck
