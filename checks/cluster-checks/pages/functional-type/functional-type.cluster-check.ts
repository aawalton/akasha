import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const functionalType = {
  id: "01a06810-92fe-7030-9b9d-343a73bdea19",
  pageTypeSlug: "cluster-check",
  slug: "functional-type",
  definition:
    "the check refusing a workspace whose declared functional type is not the one its shape implies",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }, { nodeKind: "package" }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An addon is marked by a tstl block in a tsconfig the workspace carries or extends.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing a workspace declares as a dependency marks that workspace as an addon.",
    },
  ],
} as const satisfies ClusterCheck
