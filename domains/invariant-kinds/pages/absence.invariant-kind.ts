import type { InvariantKind } from "../invariant-kind.page-type.ts"

export const absence = {
  id: "01a04e11-9f98-749e-86ea-46237bfead5e",
  pageTypeSlug: "invariant-kind",
  slug: "absence",
  definition: "something the domain deliberately leaves out",
  invariantGroupSlug: "invariant-group/design",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing an absence stops a reader adding the thing left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "An absence belongs where the thing left out is near enough to the thing kept to be reached in error.",
    },
  ],
} as const satisfies InvariantKind
