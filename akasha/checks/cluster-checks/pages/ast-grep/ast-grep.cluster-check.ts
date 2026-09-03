import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const astGrep = {
  id: "01a06810-92fd-7ee3-bcf2-ae3da5f75d48",
  pageTypeSlug: "cluster-check",
  slug: "ast-grep",
  definition: "the check refusing a source file matching a declared ast-grep pattern",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "yaml-file" }, { nodeKind: "yml-file" }],
} as const satisfies ClusterCheck
