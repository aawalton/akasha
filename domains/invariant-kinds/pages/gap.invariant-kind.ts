import type { InvariantKind } from "../invariant-kind.page-type.types.ts"

export const gap = {
  id: "01a04e11-9f98-7835-9710-117a527c190d",
  pageTypeSlug: "invariant-kind",
  type: "invariant-kind",
  slug: "gap",
  definition: "a distance between what the domain says and what it does",
  invariantGroup: "invariant-group/intent",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing a gap stops a reader relying on that gap.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gap names a state the domain should be in rather than an act to take or a reason to act.",
    },
  ],
} as const satisfies InvariantKind
