import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const simRunTree = {
  id: "01a05cee-e560-74ed-a1cf-c9f340983fda",
  type: "module",
  slug: "sim-run-tree",
  definition: "the repo-root paths a mobile sim run is built from, delivered to the macbook",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is named from the repo root.",
    },
    {
      invariantKind: "departure",
      statement: "The shell package the app names reaches the macbook whole.",
    },
    {
      invariantKind: "departure",
      statement: "The pages every shell compiles reach the macbook as the files those pages carry.",
    },
    {
      invariantKind: "departure",
      statement: "The files every shell compiles are read from the akasha checkout on disk.",
    },
    {
      invariantKind: "departure",
      statement: "Composing the paths a run is built from reads no checkout.",
    },
    {
      invariantKind: "absence",
      statement: "No page's own TypeScript file reaches the macbook.",
    },
    {
      invariantKind: "constraint",
      statement: "A path relative to the shell package answers to wherever that shell sits.",
    },
    {
      invariantKind: "departure",
      statement: "The icon is the one input named on the app's page rather than held in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "One missing path among the ones named refuses the delivery of every path.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A missing source path surfaces on the macbook as a swiftc failure inside an Xcode log.",
    },
  ],
} as const satisfies Module
