import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const championPointSource = {
  id: "01a06076-1b65-7228-8994-fbce92968c6f",
  type: "page-type/module",
  slug: "champion-point-source",
  definition: "every champion star a character can earn, read from the champion star pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stars are read from their pages in hash-place order and held with the catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's group is its constellation and whether it is slotted.",
    },
  ],
  createdAt: "2026-09-02T04:52:28.133Z",
  updatedAt: "2026-09-27T05:03:13.000Z",
} as const satisfies Module
