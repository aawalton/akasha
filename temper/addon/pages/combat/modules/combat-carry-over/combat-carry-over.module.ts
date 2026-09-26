import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatCarryOver = {
  id: "01a0de65-b876-7c64-8a5a-a41ef5aff605",
  type: "page-type/module",
  slug: "combat-carry-over",
  definition:
    "the move of upstream Combat Metrics settings and saved fights into this add-on's own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy appends upstream's two saved tables to this add-on's file under new names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each table is carried once, and a flag in this add-on's settings says it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A carried settings entry replaces this add-on's entry for the same account and character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Carried fights follow the fights this add-on already saved.",
    },
  ],
} as const satisfies Module
