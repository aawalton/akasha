import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dataminingPayload = {
  id: "01a0608a-15b1-7c8a-abad-1fed4e8585a6",
  pageTypeSlug: "module",
  slug: "datamining-payload",
  definition: "the shape a mined item, a mined quest and the sweep's own progress take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mined item is held under the item id the game gave the item.",
    },
    {
      invariantKind: "departure",
      statement: "A mined quest is held under the quest id the game gave the quest.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep's own progress rides in the payload the sweep fills.",
    },
    {
      invariantKind: "departure",
      statement: "The item sweep and the quest sweep each keep progress apart from the other.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds code that runs.",
    },
  ],
} as const satisfies Module
