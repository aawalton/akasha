import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const tailwindSources = {
  id: "01a06810-9300-7d79-b932-97fde9870761",
  pageTypeSlug: "cluster-check",
  slug: "tailwind-sources",
  definition:
    "the check refusing a Tailwind entry stylesheet whose sources miss a UI package it reaches",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "css-file" }, { nodeKind: "package" }],
  treeSha: true,
} as const satisfies ClusterCheck
