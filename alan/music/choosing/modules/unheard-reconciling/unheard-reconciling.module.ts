import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unheardReconciling = {
  id: "01a0c512-2e2b-797f-b0e7-3f85dde85399",
  type: "page-type/module",
  slug: "unheard-reconciling",
  definition: "what a playlist gains and loses to hold the tracks wanted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track wanted that the playlist does not hold is added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track the playlist holds that is wanted no longer is removed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track wanted that the playlist holds already is kept where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks are added in the order they were wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks are removed in the order the playlist holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track named twice is added once, removed once, or kept once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
