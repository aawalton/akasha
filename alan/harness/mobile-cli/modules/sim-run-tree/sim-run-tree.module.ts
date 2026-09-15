import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simRunTree = {
  id: "01a05cee-e560-74ed-a1cf-c9f340983fda",
  type: "page-type/module",
  slug: "sim-run-tree",
  definition: "the repo-root paths a mobile sim run is built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is named from the repo root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files every shell compiles are read from the akasha checkout on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Composing the paths a run is built from reads no checkout.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page's own TypeScript file reaches the macbook.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A path relative to the shell package answers to wherever that shell sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The icon is the one input named on the app's page rather than held in akasha.",
    },
  ],
} as const satisfies Module
