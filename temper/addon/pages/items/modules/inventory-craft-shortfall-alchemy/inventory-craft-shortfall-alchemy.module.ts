import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCraftShortfallAlchemy = {
  id: "01a0d4af-83e7-7b4c-8ba4-e8ac6451d959",
  type: "page-type/module",
  slug: "inventory-craft-shortfall-alchemy",
  definition:
    "the solvent and reagents an alchemy station crafts to fill a stocking rule's shortfall",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The combination crafted is the first on hand whose result the rule takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Solvents the character can use are tried first, the highest rank first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's level condition picks the solvent, since the result must pass it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two reagents are tried before three, and three only with the third slot unlocked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The result a combination makes is asked of the game rather than of the traits known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A solvent's rank is held against the character's Solvent Proficiency rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Potions and poisons both need Chemistry at its full rank.",
    },
  ],
} as const satisfies Module
