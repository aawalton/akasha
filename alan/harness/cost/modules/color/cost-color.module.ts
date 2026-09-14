import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const costColor = {
  id: "01a08b96-95c4-7a57-9ee3-efab04e522fc",
  type: "module",
  slug: "cost-color",
  definition: "the color a cost multiplier is drawn in, read with the surplus in hours",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color is one of five bands.",
    },
    {
      invariantKind: "departure",
      statement: "A band names the hours the surplus is over and the multiplier the cost is under.",
    },
    {
      invariantKind: "departure",
      statement: "A cost takes the color of the first band the cost and the surplus both fit.",
    },
    {
      invariantKind: "departure",
      statement: "The bands are tried in the order they are written.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus over four hours with a cost of nothing is blue.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus over nothing with a cost of nothing is green.",
    },
    {
      invariantKind: "departure",
      statement:
        "A surplus over minus four hours with a cost no higher than one multiplier is yellow.",
    },
    {
      invariantKind: "departure",
      statement:
        "A surplus over minus eight hours with a cost no higher than two multipliers is red.",
    },
    {
      invariantKind: "departure",
      statement: "A cost no band fits is black.",
    },
    {
      invariantKind: "departure",
      statement: "A band fits a surplus strictly over the hours that band names.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus of four hours is under the blue band rather than in it.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of nothing is green where a cost of one multiplier is yellow.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cost between nothing and one multiplier is read by its band rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "A cost nothing was read for is black rather than green.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus nothing was read for is black rather than a surplus of nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "The hours a band opens at are named here rather than read off a scale.",
    },
    {
      invariantKind: "constraint",
      statement: "The color is worked out without reaching a store.",
    },
  ],
} as const satisfies Module
