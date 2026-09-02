import type { Module } from "@akasha/code-system/module"

export const catalogConstants = {
  id: "01a063ba-94e5-7067-b212-ee1558bee77b",
  pageTypeSlug: "module",
  slug: "catalog-constants",
  definition: "the add-on's name and the delays its collection run is paced by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name here is the name the game loads the add-on under.",
    },
    {
      invariantKind: "departure",
      statement: "The start delay leaves the game time to settle before the first collector runs.",
    },
    {
      invariantKind: "departure",
      statement: "A collector answering nothing within the timeout is given up on.",
    },
  ],
} as const satisfies Module
