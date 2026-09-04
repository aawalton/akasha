import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const spacingScale = {
  id: "01a06810-9300-7951-9ff1-8e26255a2570",
  pageTypeSlug: "cluster-check",
  slug: "spacing-scale",
  definition: "the check refusing a Swift widget gap or padding written as a bare number",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "swift-file" }, { nodeKind: "sh-file" }],
} as const satisfies ClusterCheck
