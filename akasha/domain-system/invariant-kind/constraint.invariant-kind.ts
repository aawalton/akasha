import type { InvariantKind } from "./invariant-kind.page-type.ts"

export const constraint = {
  id: "01a04e11-9f98-7f57-a74d-2bf329d4a0a0",
  pageTypeSlug: "invariant-kind",
  slug: "constraint",
  definition: "a limit nobody here chose",
  invariantGroupSlug: "invariant-group/design",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing a constraint stops a reader asking for the impossible.",
    },
  ],
} as const satisfies InvariantKind
