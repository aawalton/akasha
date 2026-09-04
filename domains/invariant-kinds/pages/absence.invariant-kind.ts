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
      statement: "Knowing an absence stops a reader adding it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An absence belongs where what is left out is near enough to what is kept to be reached by mistake.",
    },
  ],
} as const satisfies InvariantKind
