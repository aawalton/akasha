import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingQuestMiner = {
  id: "01a06341-d9e8-7005-ac02-69345fb477d3",
  type: "module",
  slug: "datamining-quest-miner",
  definition: "what the game says about every quest, taken one quest id at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Quest ids are mined in batches rather than in one run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A quest id the game names nothing for is counted as a miss.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A quest has the name of the zone the quest sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generation count makes stopped mining drop its own queued batch.",
    },
  ],
} as const satisfies Module
