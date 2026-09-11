import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gitDir = {
  id: "01a091c8-bebb-7cc6-ac6a-ed37511fe84b",
  type: "module",
  slug: "git-dir",
  definition: "the folder git keeps a checkout in, asked of git rather than spelled",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is the one every worktree of a checkout shares.",
    },
    {
      invariantKind: "departure",
      statement: "A worktree is answered the folder its checkout shares rather than its own.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is absolute.",
    },
    {
      invariantKind: "departure",
      statement: "A relative answer from git is read against the root asked about.",
    },
    {
      invariantKind: "departure",
      statement: "A root git answers nothing for is answered as no folder.",
    },
    {
      invariantKind: "absence",
      statement: "The folder's name is not spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "What is under the folder is not said here.",
    },
  ],
} as const satisfies Module
