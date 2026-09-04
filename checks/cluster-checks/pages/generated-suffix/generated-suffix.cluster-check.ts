import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const generatedSuffix = {
  id: "01a06810-92fe-7859-b9c5-7dd99ead40c8",
  pageTypeSlug: "cluster-check",
  slug: "generated-suffix",
  definition: "the check refusing a machine-produced source file not named with a generated suffix",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
} as const satisfies ClusterCheck
