import type { Module } from "@akasha/code-system/module"

export const repoPath = {
  id: "01a05cc6-2a1c-751d-8813-33c04d9c2005",
  pageTypeSlug: "module",
  slug: "repo-path",
  definition: "a path spelled out in full, and whether it stands inside a repository",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is spelled out as far as anything stands on disk and left alone after that point.",
    },
    {
      invariantKind: "departure",
      statement: "A path that cannot be spelled out at all is answered as it was given.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside `.git` names the repository rather than anything it says.",
    },
  ],
} as const satisfies Module
