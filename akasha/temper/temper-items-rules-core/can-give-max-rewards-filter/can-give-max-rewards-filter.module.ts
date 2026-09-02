import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canGiveMaxRewardsFilter = {
  id: "01a06100-3be5-777a-bd80-406d92d501f0",
  pageTypeSlug: "module",
  slug: "can-give-max-rewards-filter",
  definition: "the Can Give Max Rewards condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canGiveMaxRewards` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `open` is offered no Can Give Max Rewards condition.",
    },
  ],
} as const satisfies Module
