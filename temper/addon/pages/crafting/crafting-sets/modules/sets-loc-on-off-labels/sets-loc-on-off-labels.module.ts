import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocOnOffLabels = {
  id: "01a061d7-7bb7-7e19-ab98-7217b31320b1",
  type: "page-type/module",
  slug: "sets-loc-on-off-labels",
  definition: "the game's own ON and OFF words, upper-cased",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys are the booleans spelled as text rather than booleans.",
    },
  ],
} as const satisfies Module
