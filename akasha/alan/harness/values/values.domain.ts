import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const values = {
  id: "01a06297-07b2-7d7c-95f8-f8833e4b531f",
  pageTypeSlug: "domain",
  slug: "values",
  definition: "how far a day went toward each of the things that matter to Alan",
  partSlugs: [
    "readout/faith",
    "readout/love",
    "readout/health",
    "readout/learn",
    "readout/fun",
    "readout/wealth",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading here totals the rungs Alan's personas reached for one value on a day.",
    },
    {
      invariantKind: "departure",
      statement: "The six are read against one scale rather than against a scale each.",
    },
    {
      invariantKind: "departure",
      statement: "These six are the count Alan's daily points are weighed against.",
    },
    {
      invariantKind: "constraint",
      statement: "A value nothing can be read for is shown as no signal rather than as a zero.",
    },
    {
      invariantKind: "stopgap",
      statement: "No workstation timer takes the readings for these six.",
    },
    {
      invariantKind: "gap",
      statement: "A reading here is taken and carried as the other groups' readings are.",
    },
  ],
} as const satisfies Domain
