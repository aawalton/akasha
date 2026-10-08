import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortCapture = {
  id: "01a11c76-a81a-76a2-8dc0-e948c3d04595",
  type: "page-type/module",
  slug: "quest-port-capture",
  definition: "the shape of the open journal and of each port press, as the addon writes them down",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace keeps the last twenty presses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The oldest press goes first when the trace is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A press keeps the five candidates nearest the objective, nearest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A candidate's distance is straight-line distance on the map.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls the game.",
    },
  ],
  createdAt: "2026-10-08T17:01:40.762Z",
  updatedAt: "2026-10-08T17:01:40.762Z",
} as const satisfies Module
