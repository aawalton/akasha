import type { Module } from "@akasha/code-system/module"

export const testSelection = {
  id: "01a0685e-023f-7017-bcd9-73e92d42b464",
  pageTypeSlug: "module",
  slug: "test-selection",
  definition:
    "which of a workspace's test files the changed files reach, and where the map places the workspace",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workspace the map does not hold runs its full test set.",
    },
    {
      invariantKind: "departure",
      statement: "A change list of nothing runs the full test set rather than none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A changed file that is no TypeScript file runs the full test set, because the map holds only TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A changed file the map does not name reaches no test rather than every test.",
    },
    {
      invariantKind: "departure",
      statement:
        "An artifact too old to state its population says so rather than claiming the workspace was undiscovered.",
    },
    {
      invariantKind: "departure",
      statement: "A selected test is named relative to the workspace it runs in.",
    },
  ],
} as const satisfies Module
