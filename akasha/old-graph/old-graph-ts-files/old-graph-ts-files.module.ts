import type { Module } from "@akasha/code-system/module"

export const oldGraphTsFiles = {
  id: "01a06950-57ae-704d-9869-2ae4f46c6776",
  pageTypeSlug: "module",
  slug: "old-graph-ts-files",
  definition: "what the old graph knew of a TypeScript file, its imports and its mock module calls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file ending in tsx is a tsx node and any other file is a ts node.",
    },
    {
      invariantKind: "departure",
      statement: "A node id naming neither kind of file answers as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every call that would parse a file throws.",
    },
  ],
} as const satisfies Module
