import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingQuestMiner = {
  id: "01a06341-d9e8-7005-ac02-69345fb477d3",
  type: "page-type/module",
  slug: "datamining-quest-miner",
  definition: "what the game says about every quest, taken one quest id at a time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Quest ids are mined in batches rather than in one run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest id the game names nothing for is counted as a miss.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A quest has the name of the zone the quest sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generation count makes stopped mining drop its own queued batch.",
    },
  ],
} as const satisfies Module
