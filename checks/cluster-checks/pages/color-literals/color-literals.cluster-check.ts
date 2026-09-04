import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const colorLiterals = {
  id: "01a06810-92fe-7070-b58b-03d0f97e8ea7",
  pageTypeSlug: "cluster-check",
  slug: "color-literals",
  definition:
    "the check refusing a color written as a literal rather than taken from a design token",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }, { nodeKind: "css-file" }],
} as const satisfies ClusterCheck
