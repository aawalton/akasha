import type { Module } from "../code-system/module/module.page-type.ts"

export const landing = {
  id: "01a04bdd-596d-7df0-b23c-e52139fd8bc2",
  pageTypeSlug: "module",
  slug: "landing",
  definition:
    "a change judged against one commit and then written and committed onto it, or refused whole",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is a base commit and the bodies it would leave.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the change does not touch is read from the base commit, never from the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies the change does not touch are read through one git process for the whole judging, not one for each.",
    },
    {
      invariantKind: "departure",
      statement: "A path the base commit does not carry is an answer, not an error.",
    },
    {
      invariantKind: "departure",
      statement: "That git process is ended when the judging ends, however it ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "The commit the change was judged against is the commit it lands on, or it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One hold spans reading the base, judging, writing, indexing and committing.",
    },
    {
      invariantKind: "departure",
      statement: "A change that never took the hold is refused unjudged and unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws has committed nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that landed is never answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index is settled before the commit, so no commit lands on an index blind to it.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaches disk only after every check has passed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run may gate and report and leave nothing at all, not a file and not a loose object.",
    },
    {
      invariantKind: "departure",
      statement: "Gating without writing and writing without gating are refused together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks are reached only to judge, so reaching a command never asks them to load.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index is reached only to keep it, so a refused change and a dry run never ask it to load.",
    },
    {
      invariantKind: "departure",
      statement:
        "Checks that will not load refuse the change; only writing without gating carries past them, and why they would not load is said in the answer and in the commit.",
    },
    {
      invariantKind: "gap",
      statement: "A change that was judged is the change that landed.",
    },
  ],
} as const satisfies Module
