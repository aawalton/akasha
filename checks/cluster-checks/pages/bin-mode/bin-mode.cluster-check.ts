import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const binMode = {
  id: "01a06810-92fd-723c-b4dd-1d744890c0f5",
  pageTypeSlug: "cluster-check",
  slug: "bin-mode",
  definition:
    "the check refusing a bin command a manifest names that git does not hold as executable",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "package" }],
} as const satisfies ClusterCheck
