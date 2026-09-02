import type { Module } from "@akasha/code-system/module"

export const libsetsUpstreamVerify = {
  id: "01a060d0-ca2a-7b19-860d-b24372089328",
  pageTypeSlug: "module",
  slug: "libsets-upstream-verify",
  definition: "the ruling on whether a checkout really holds the pinned upstream LibSets",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tree carrying compiled-bundle markers is refused as upstream.",
    },
    {
      invariantKind: "departure",
      statement: "A tree carrying no upstream manifest is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A tree missing a file the pin requires is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest carrying no AddOnVersion line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A tree whose AddOnVersion differs from the pinned release is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout whose commit cannot be read is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout at a commit other than the pinned commit is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout carrying local edits is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says which of the rulings the tree failed.",
    },
    {
      invariantKind: "constraint",
      statement: "A tree is held to a release by its AddOnVersion rather than by a line count.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
