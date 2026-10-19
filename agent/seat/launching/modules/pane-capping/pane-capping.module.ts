import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const paneCapping = {
  id: "01a0e31c-9dfb-72e7-8217-ccc7bb763e61",
  type: "page-type/module",
  slug: "pane-capping",
  definition: "how code keeps the processes a seat starts under a limit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A launch waits up to thirty seconds for its pane to sit in a scope of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane in the scope its launch made carries its bound already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane in a scope tmux made is given the bound on that scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pane left in a scope it shares is reported with that scope and the cap reaching that scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cap reaching a scope is the nearest `pids.max` above it that is a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane gone before its scope is read is reported rather than waited for.",
    },
  ],
  createdAt: "2026-09-27T13:44:58.619Z",
  updatedAt: "2026-10-19T20:12:35.455Z",
} as const satisfies Module
