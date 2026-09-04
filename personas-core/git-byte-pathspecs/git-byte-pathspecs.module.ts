import type { Module } from "../../code-system/modules/module.page-type.ts"

export const gitBytePathspecs = {
  id: "01a05b70-a58c-71c5-b942-5c0973d995c0",
  pageTypeSlug: "module",
  slug: "git-byte-pathspecs",
  definition: "the git pathspecs a persona's points are counted over, for a path prefix",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A prefix nobody named counts markdown rather than code.",
    },
    {
      invariantKind: "departure",
      statement: "Two prefixes asking for one pathspec make one listing.",
    },
  ],
} as const satisfies Module
