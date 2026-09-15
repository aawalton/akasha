import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingItemMiner = {
  id: "01a06341-d9e8-7004-990d-d242df0e2bd1",
  type: "module",
  slug: "datamining-item-miner",
  definition: "what the game says about every item, taken one item id at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Item ids are mined in batches rather than in one run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A batch hands the game back to the player before the next batch starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item id the game names nothing for is counted as a miss.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "Completed item mining starts quest mining.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Mining resumes from the last id rather than from the first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generation count makes stopped mining drop its own queued batch.",
    },
  ],
} as const satisfies Module
