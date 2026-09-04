import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const esoGlobalDeclConsistency = {
  id: "01a06810-92fe-796f-8f46-b347b1f611e5",
  pageTypeSlug: "cluster-check",
  slug: "eso-global-decl-consistency",
  definition:
    "the check refusing a hand-written global the generated ESO surface exposes only as a method",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "temper" }],
} as const satisfies ClusterCheck
