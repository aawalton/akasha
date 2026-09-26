import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSetInfo = {
  id: "01a0de03-2163-79bb-b7fd-7c2a59ab9826",
  type: "page-type/module",
  slug: "sets-set-info",
  definition: "each set's kind, drop ways, places, release and veteran slots, by set id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each entry is worked out from its set's page, which the compiler writes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has an entry only where its page states its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's class is the game's id for the class its page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A veteran slot is the game constant the set's page names it by.",
    },
  ],
} as const satisfies Module
