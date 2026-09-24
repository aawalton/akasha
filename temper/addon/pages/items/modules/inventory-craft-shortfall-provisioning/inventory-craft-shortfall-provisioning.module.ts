import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCraftShortfallProvisioning = {
  id: "01a0d4ad-3d1a-7e34-ae35-c1f07a79ed05",
  type: "page-type/module",
  slug: "inventory-craft-shortfall-provisioning",
  definition: "the recipe a provisioning station crafts to fill a stocking rule's shortfall",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The recipe crafted is the first the character knows whose result the rule takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Food needs Chef at its full rank, and drink needs Brewer at its full rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each tradeskill level a recipe asks the game for is held against the character's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provisioning level a recipe needs is named as Recipe Improvement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe's quality need is held against the character's Recipe Quality rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank a recipe needs is checked before the yield passive.",
    },
  ],
} as const satisfies Module
