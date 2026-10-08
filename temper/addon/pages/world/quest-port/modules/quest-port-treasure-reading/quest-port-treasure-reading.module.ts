import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortTreasureReading = {
  id: "01a11cf9-8e7f-76af-8e9e-ec90bb96f162",
  type: "page-type/module",
  slug: "quest-port-treasure-reading",
  definition: "the treasure port presses the world add-on wrote down, read back as lines",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A treasure press shows the item it read, its slot and every spot known for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rest of a treasure press reads as a quest port press reads.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or calls the game.",
    },
  ],
  createdAt: "2026-10-08T19:24:39.422Z",
  updatedAt: "2026-10-08T19:24:39.422Z",
} as const satisfies Module
