import type { Module } from "@akasha/code-system/module"

export const populationBound = {
  id: "01a06829-124f-786a-9dbd-9ce891c54621",
  pageTypeSlug: "module",
  slug: "population-bound",
  definition: "what a check run says about the population the run reached, said beside the verdict",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict carries the population the verdict rests on.",
    },
    {
      invariantKind: "departure",
      statement: "An empty population is said as certifying nothing rather than as a clean run.",
    },
    {
      invariantKind: "departure",
      statement:
        "Members that could not be examined and members that never arrived are counted apart.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the members were read under is said beside the count.",
    },
    {
      invariantKind: "departure",
      statement: "A population with no site on this filesystem is said to stand under no tree.",
    },
    {
      invariantKind: "departure",
      statement: "A shortfall against a least count names that count and where it was declared.",
    },
    {
      invariantKind: "departure",
      statement: "A member that could not be examined is named together with the reason.",
    },
    {
      invariantKind: "departure",
      statement: "At most ten unexaminable members are named and the rest are counted.",
    },
    {
      invariantKind: "departure",
      statement: "A population that reached its count and read every member says no shortfall.",
    },
  ],
} as const satisfies Module
