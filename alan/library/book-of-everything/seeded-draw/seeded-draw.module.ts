import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const seededDraw = {
  id: "01a077e7-e766-7e74-bb8e-f95b949f5b32",
  pageTypeSlug: "module",
  slug: "seeded-draw",
  definition: "a seed number turned into a source of draws giving the same run of numbers again",
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
  ],
} as const satisfies Module
