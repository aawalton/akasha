import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const metric = {
  id: "01a0658b-0f02-7858-82a5-11f7915cb90f",
  pageTypeSlug: "domain",
  slug: "metric",
  definition: "a number about the system, recorded over time",
  pluralSlug: "metrics",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric is kept for months.",
    },
    {
      invariantKind: "departure",
      statement:
        "Most of what is measured comes from an instrument rather than from the thing measured.",
    },
  ],
} as const satisfies Domain
