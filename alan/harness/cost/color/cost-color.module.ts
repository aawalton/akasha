import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const costColor = {
  id: "01a08b96-95c4-7a57-9ee3-efab04e522fc",
  pageTypeSlug: "module",
  type: "module",
  slug: "cost-color",
  definition: "the color a cost multiplier is drawn in, read with the surplus",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cost of nothing is green whatever the surplus is.",
    },
    {
      invariantKind: "departure",
      statement: "A cost above one is black whatever the surplus is.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of one or less is yellow where the surplus is blue.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of one or less is red where the surplus is green.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of one or less is black where the surplus is beneath green.",
    },
    {
      invariantKind: "departure",
      statement: "A cost nothing was read for is black rather than green.",
    },
    {
      invariantKind: "departure",
      statement: "A cost is never drawn blue.",
    },
    {
      invariantKind: "constraint",
      statement: "The color is worked out without reaching a store.",
    },
  ],
} as const satisfies Module
