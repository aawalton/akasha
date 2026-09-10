import type { InvariantKind } from "../invariant-kind.page-type.types.ts"

export const absence = {
  id: "01a04e11-9f98-749e-86ea-46237bfead5e",
  pageTypeSlug: "invariant-kind",
  type: "invariant-kind",
  slug: "absence",
  definition: "something the domain deliberately leaves out",
  invariantGroup: "invariant-group/design",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing an absence stops a reader adding the thing left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "An absence belongs where the thing left out sits near the thing kept and is reached in error.",
    },
  ],
} as const satisfies InvariantKind
