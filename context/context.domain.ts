import type { Domain } from "../domains/domain.page-type.ts"

export const context = {
  id: "01a04f50-2a7e-7000-a43d-22ce4657c379",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "context",
  definition: "what a change requires its writer to have read",
  parts: ["page-type/context-warrant", "module/agent-stated", "module/warranting"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A warrant applies to the seat changing a file rather than to a seat reading that file.",
    },
    {
      invariantKind: "departure",
      statement: "Warrants reach no further than the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "Every warrant a change owes is stated by a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The warrants a change owes are worked out from the warrant pages.",
    },
  ],
} as const satisfies Domain
