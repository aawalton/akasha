import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateCooldown = {
  id: "01a0725a-758c-7335-9600-2a7c8c1391a4",
  type: "page-type/module",
  slug: "state-cooldown",
  definition: "when code writes a change to a file the editor reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a file quiet for its cooldown is written at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change arriving sooner waits out the rest of that cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the last change to arrive in a cooldown is kept waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the same as the line already written is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change back to the line already written leaves nothing waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cooldown is counted from the last write of one file alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock or opens a file.",
    },
  ],
  createdAt: "2026-09-05T16:15:26.092Z",
  updatedAt: "2026-10-30T15:36:21.087Z",
} as const satisfies Module
