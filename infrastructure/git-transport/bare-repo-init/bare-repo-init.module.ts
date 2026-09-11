import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const bareRepoInit = {
  id: "01a06816-2f11-7d89-91b6-f31d958dbb60",
  pageTypeSlug: "module",
  type: "module",
  slug: "bare-repo-init",
  definition: "the bare repositories made ready before the transport serves them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One run goes at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A lock beside the repositories has the run.",
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
      statement: "Nothing here takes away a repository that has the only second copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination and a policy are written on every run rather than only at creation.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is a stub this module writes.",
    },
    {
      invariantKind: "departure",
      statement: "A hook stub runs the script the source cache has.",
    },
    {
      invariantKind: "departure",
      statement: "A step that failed ends the run rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a hook stub sits in is made before that stub is written.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever a hook's name already reaches is taken away before the stub is written.",
    },
    {
      invariantKind: "departure",
      statement: "A repository repacks on no push.",
    },
  ],
} as const satisfies Module
