import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const seededDraw = {
  id: "01a077e7-e766-7e74-bb8e-f95b949f5b32",
  pageTypeSlug: "module",
  type: "module",
  slug: "seeded-draw",
  definition: "items drawn without replacement from a source of draws a seed makes repeatable",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One seed gives one run of draws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draw is a whole number from nought up to but not including the bound asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The run is arithmetic on the seed rather than the machine's own entropy.",
    },
    {
      invariantKind: "departure",
      statement: "A bound that is no positive whole number is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "Two seeds that differ give runs that differ.",
    },
    {
      invariantKind: "departure",
      statement: "A draw asking for more items than there are gives every item there is.",
    },
    {
      invariantKind: "departure",
      statement: "The source of randomness is handed in rather than reached for.",
    },
    {
      invariantKind: "departure",
      statement: "An index the randomness returns from outside its bound is refused.",
    },
  ],
} as const satisfies Module
