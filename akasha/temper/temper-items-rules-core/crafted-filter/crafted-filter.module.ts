import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const craftedFilter = {
  id: "01a06100-3be9-72bb-ae2f-272ecba3d354",
  pageTypeSlug: "module",
  slug: "crafted-filter",
  definition: "the Crafted Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `crafted` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category outside the 8 roots named in the code is offered no Crafted Status condition.",
    },
    {
      invariantKind: "departure",
      statement: "A rule carrying the `stolen` condition is offered no Crafted Status condition.",
    },
  ],
} as const satisfies Module
