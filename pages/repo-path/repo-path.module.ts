import type { Module } from "@akasha/code/module"

export const repoPath = {
  id: "01a05cc6-2a1c-751d-8813-33c04d9c2005",
  pageTypeSlug: "module",
  type: "module",
  slug: "repo-path",
  definition: "a path spelled out in full, and whether it is inside a repository",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is spelled out as far as anything exists on disk and left alone after that point.",
    },
    {
      invariantKind: "departure",
      statement: "A path that cannot be spelled out at all is answered as that path was given.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside `.git` names the repository rather than anything that path says.",
    },
  ],
} as const satisfies Module
