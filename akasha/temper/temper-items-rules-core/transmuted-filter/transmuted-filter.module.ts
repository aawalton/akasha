import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const transmutedFilter = {
  id: "01a06100-3c00-7289-bd55-ca10e321d94e",
  pageTypeSlug: "module",
  slug: "transmuted-filter",
  definition: "the Transmuted Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `transmuted` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `equipment` is offered no Transmuted Status condition.",
    },
  ],
} as const satisfies Module
