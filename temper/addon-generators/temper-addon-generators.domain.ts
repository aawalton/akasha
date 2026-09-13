import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperAddonGenerators = {
  id: "01a06073-2499-7d6c-8220-9fb541b99067",
  type: "domain",
  slug: "temper-addon-generators",
  definition: "the source text of every data file temper renders from its own pages",
  parts: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generator here renders source text and writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "A key a generator renders is written as a string literal rather than bare.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rendered file lands is settled by the caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rendered file landing outside akasha has a line telling a reader not to edit that file.",
    },
  ],
} as const satisfies Domain
