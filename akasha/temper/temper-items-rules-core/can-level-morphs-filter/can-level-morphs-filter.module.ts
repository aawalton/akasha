import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canLevelMorphsFilter = {
  id: "01a06100-3be6-725c-a600-133642aa5e5b",
  pageTypeSlug: "module",
  slug: "can-level-morphs-filter",
  definition: "the Can Level Morphs condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canLevelMorphs` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `stock` is offered no Can Level Morphs condition.",
    },
  ],
} as const satisfies Module
