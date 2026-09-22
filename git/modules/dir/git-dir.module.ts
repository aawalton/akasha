import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitDir = {
  id: "01a091c8-bebb-7cc6-ac6a-ed37511fe84b",
  type: "page-type/module",
  slug: "git-dir",
  definition: "the folder git keeps a checkout in, asked of git rather than spelled",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is the one every tree of a checkout shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree under that folder is answered that folder, as a worktree is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is absolute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative answer from git is read against the root asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root git answers nothing for is answered as no folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The folder's name is not spelled here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What is under the folder is not said here.",
    },
  ],
} as const satisfies Module
