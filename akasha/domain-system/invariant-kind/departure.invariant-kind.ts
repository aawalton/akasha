import type { InvariantKind } from "./invariant-kind.page-type.ts"

export const departure = {
  id: "01a04e11-9f98-742c-ba51-d96396b9ea5f",
  pageTypeSlug: "invariant-kind",
  slug: "departure",
  definition: "a decision a reader would not guess right",
  groupSlug: "invariant-group/design",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing a departure stops a reader undoing it.",
    },
  ],
} as const satisfies InvariantKind
