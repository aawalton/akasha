import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attackMode = {
  id: "01a0c484-0cd6-77db-9d41-592402c8073c",
  type: "page-type/module",
  slug: "attack-mode",
  definition: "a strike's power set against the defence it meets",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mode names one stat for the attacker and one for the defender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sheet holding neither stat refuses the mode rather than counting nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here settles whether the strike lands.",
    },
  ],
} as const satisfies Module
