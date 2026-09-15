import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingPayload = {
  id: "01a0608a-15b1-7c8a-abad-1fed4e8585a6",
  type: "module",
  slug: "datamining-payload",
  definition: "the shape a mined item, a mined quest and the sweep's own progress take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mined item is held under the item id the game gave the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mined quest is held under the quest id the game gave the quest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep's own progress rides in the payload the sweep fills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The item sweep and the quest sweep each keep progress apart from the other sweep.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has code that runs.",
    },
  ],
} as const satisfies Module
