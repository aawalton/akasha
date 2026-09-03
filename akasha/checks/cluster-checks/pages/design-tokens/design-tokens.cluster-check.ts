import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const designTokens = {
  id: "01a06810-92fe-734d-a3f2-31ca0a2b8f6e",
  pageTypeSlug: "cluster-check",
  slug: "design-tokens",
  definition:
    "the check refusing a design-token color the TypeScript tokens and tokens.css disagree on",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "shared/design-tokens" }],
} as const satisfies ClusterCheck
