import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const staleFolders = {
  id: "01a0683d-3c17-7dd8-991b-d05270ddec1f",
  type: "module",
  slug: "stale-folders",
  definition:
    "a repository folder no tracked or untracked file accounts for, and what it costs on disk",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is known by a file under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "An empty folder git cannot name is stale.",
    },
    {
      invariantKind: "departure",
      statement: "A package with no workspaces of its own is not descended into.",
    },
    {
      invariantKind: "departure",
      statement: "The files accounting for a folder are handed in rather than asked of git here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here removes a folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the command line or ends the process.",
    },
  ],
} as const satisfies Module
