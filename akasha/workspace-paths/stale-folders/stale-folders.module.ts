import type { Module } from "../../code-system/modules/module.page-type.ts"

export const staleFolders = {
  id: "01a0683d-3c17-7dd8-991b-d05270ddec1f",
  pageTypeSlug: "module",
  slug: "stale-folders",
  definition:
    "the folders of a repository that no tracked or untracked file accounts for, and what they cost on disk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder is known by a file standing under it, so an empty folder git cannot name is stale.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package holding no workspaces of its own is not descended into, so a linked package's build output is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A stale folder is reported before it is removed.",
    },
  ],
} as const satisfies Module
