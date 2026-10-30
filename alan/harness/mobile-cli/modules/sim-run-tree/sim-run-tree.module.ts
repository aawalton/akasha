import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simRunTree = {
  id: "01a05cee-e560-74ed-a1cf-c9f340983fda",
  type: "page-type/module",
  slug: "sim-run-tree",
  definition: "the paths a run of an app in a simulator reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is named from the repo root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files every shell compiles are read from the akasha checkout on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Composing the paths a run is built from reads no checkout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page's own TypeScript file reaches the macbook.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A path relative to the shell package answers to wherever that shell sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The icon is the one input named on the app's page rather than held in akasha.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:28:58.909Z",
} as const satisfies Module
