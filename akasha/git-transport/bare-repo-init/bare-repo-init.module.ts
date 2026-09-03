import type { Module } from "@akasha/code-system/module"

export const bareRepoInit = {
  id: "01a06816-2f11-7d89-91b6-f31d958dbb60",
  pageTypeSlug: "module",
  slug: "bare-repo-init",
  definition: "the bare repositories made ready before the transport serves them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One run at a time, held by a lock beside the repositories.",
    },
    {
      invariantKind: "departure",
      statement: "A repository already there is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A repository whose HEAD will not read is cloned again from its mirror.",
    },
    {
      invariantKind: "departure",
      statement: "A repository whose authority is a workstation tree is created empty.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here takes away a repository that holds the only second copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination and a policy are written on every run rather than only at creation.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is a stub this writes, running the script the source cache holds.",
    },
    {
      invariantKind: "departure",
      statement: "A step that failed ends the run rather than being passed over.",
    },
  ],
} as const satisfies Module
