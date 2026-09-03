import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const mockModuleSurface = {
  id: "01a06810-92ff-7d50-8301-f60e76494646",
  pageTypeSlug: "cluster-check",
  slug: "mock-module-surface",
  definition: "the check refusing a mock.module factory missing a key for an export it replaces",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
  treeSha: true,
} as const satisfies ClusterCheck
