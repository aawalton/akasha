import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rankLadder = {
  id: "01a0c48d-e4cd-7dba-b746-284315f9695b",
  type: "page-type/module",
  slug: "rank-ladder",
  definition: "the next rank up a ladder of ranks, and whether the top is already reached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A ladder is climbed one rank at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank the ladder does not carry is refused rather than treated as the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A climber at the top stays at the top.",
    },
  ],
} as const satisfies Module
