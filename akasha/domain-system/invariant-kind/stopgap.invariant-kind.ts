import type { InvariantKind } from "./invariant-kind.page-type.ts"

export const stopgap = {
  id: "01a04e11-9f98-71ff-aa09-58376078e6f5",
  pageTypeSlug: "invariant-kind",
  slug: "stopgap",
  definition: "a state kept by hand until something is built to hold it",
  groupSlug: "invariant-group/condition",
  design: [
    {
      invariantKind: "departure",
      statement: "A stopgap is paired with a gap to make it always true.",
    },
  ],
} as const satisfies InvariantKind
