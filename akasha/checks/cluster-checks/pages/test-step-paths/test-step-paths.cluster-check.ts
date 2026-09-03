import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const testStepPaths = {
  id: "01a06810-9300-7919-94d2-0b85e2ea16a1",
  pageTypeSlug: "cluster-check",
  slug: "test-step-paths",
  definition: "the check refusing a test file sitting outside every declared workspace root",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }, { nodeKind: "package" }],
} as const satisfies ClusterCheck
