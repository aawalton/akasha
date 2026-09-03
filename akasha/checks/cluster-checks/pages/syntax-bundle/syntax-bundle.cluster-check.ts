import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const syntaxBundle = {
  id: "01a06810-9300-7178-abda-c0a4262014dd",
  pageTypeSlug: "cluster-check",
  slug: "syntax-bundle",
  definition:
    "the check refusing TypeScript carrying a syntax pattern a registered scanner rejects",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
  alwaysRun: true,
  treeSha: true,
  resources: { requestCpu: "1", requestMemory: "2Gi", limitMemory: "4Gi" },
} as const satisfies ClusterCheck
