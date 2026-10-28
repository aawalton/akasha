import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleActing = {
  id: "01a1839f-a04a-7e30-947e-df338035e1f2",
  type: "page-type/module",
  slug: "settle-acting",
  definition: "the player's action a settled line carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line whose reading's `character` is a player character carries its turn's `action`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character a reading names is the one who acted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line of any other reading, or on a turn stating no action, carries none.",
    },
  ],
  createdAt: "2026-10-28T17:47:18.985Z",
  updatedAt: "2026-10-28T17:47:18.985Z",
} as const satisfies Module
