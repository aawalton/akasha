import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const metric = {
  id: "01a0658b-0f02-7858-82a5-11f7915cb90f",
  type: "domain",
  slug: "metric",
  definition: "a number about the system, recorded over time",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A metric is kept for months.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A metric comes largely from an instrument rather than from the thing measured.",
    },
  ],
} as const satisfies Domain
