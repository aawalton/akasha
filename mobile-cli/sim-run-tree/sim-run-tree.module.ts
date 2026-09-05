import type { Module } from "@akasha/code-system/module"

export const simRunTree = {
  id: "01a05cee-e560-74ed-a1cf-c9f340983fda",
  pageTypeSlug: "module",
  slug: "sim-run-tree",
  definition: "the repo-root paths a mobile sim run is built from, delivered whole to the macbook",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seam scripts and iOS components are named from the repo root.",
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
