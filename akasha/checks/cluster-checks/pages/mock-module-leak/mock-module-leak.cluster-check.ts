import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const mockModuleLeak = {
  id: "01a06810-92ff-7421-9b28-2b711c72c733",
  pageTypeSlug: "cluster-check",
  slug: "mock-module-leak",
  definition:
    "the check refusing a mock.module stub replacing an export other files in the package import",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
  treeSha: true,
} as const satisfies ClusterCheck
