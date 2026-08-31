import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const contextSystem = {
  id: "01a04f50-2a7e-7000-a43d-22ce4657c379",
  pageTypeSlug: "domain",
  slug: "context-system",
  definition: "what a change requires its writer to have read",
  partSlugs: [
    "page-type/context-warrant",
    "module/seat-stated",
    "module/warrant-scratch",
    "module/warranting",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A warrant stands over the seat changing a file rather than over one reading it.",
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
      invariantKind: "gap",
      statement: "What a change owes is worked out from the warrant pages.",
    },
    {
      invariantKind: "gap",
      statement: "No file names them by hand.",
    },
  ],
} as const satisfies Domain
