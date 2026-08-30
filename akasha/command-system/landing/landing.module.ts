import type { Module } from "../../code-system/module/module.page-type.ts"

export const landing = {
  id: "01a04bdd-596d-7df0-b23c-e52139fd8bc2",
  pageTypeSlug: "module",
  slug: "landing",
  definition:
    "a change judged against one commit and then written and committed onto it, or refused whole",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is a base commit and the bodies it would leave.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the change does not touch is read from the base commit rather than from the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies the change does not touch are read through one git process for the whole judging rather than one for each.",
    },
    {
      invariantKind: "departure",
      statement: "That git process is ended when the judging ends however it ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "The commit the change was judged against is the commit it lands on or it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A change may state the commit its bodies were read against.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that moved between that commit and what stands is refused unwritten rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A commit landing elsewhere in the repository moves no path this change carries.",
    },
    {
      invariantKind: "absence",
      statement:
        "A change stating no commit it was read against is taken as read against what stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is overwritten only where what stands on disk is the body its writer read.",
    },
    {
      invariantKind: "departure",
      statement: "One that moved is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change commits only where no commit reaching `akasha/` landed between the base it read and the writing.",
    },
    {
      invariantKind: "departure",
      statement: "One that did is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "What was written is put back when anything after the writing throws.",
    },
    {
      invariantKind: "departure",
      statement: "What is put back is the base commit's bodies.",
    },
    {
      invariantKind: "gap",
      statement: "The index is not put back with the bodies.",
    },
    {
      invariantKind: "departure",
      statement:
        "One hold spans reading the base and judging and writing and indexing and committing.",
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
      statement: "The index is settled before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaches disk only after every check has passed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run may gate and report and leave nothing at all: not a file and not a loose object.",
    },
    {
      invariantKind: "departure",
      statement: "Gating without writing and writing without gating are refused together.",
    },
    {
      invariantKind: "departure",
      statement: "The index is reached only to keep it.",
    },
    {
      invariantKind: "departure",
      statement: "Checks that will not load refuse the change.",
    },
    {
      invariantKind: "departure",
      statement: "Only writing without gating carries past them.",
    },
    {
      invariantKind: "departure",
      statement: "Why they would not load is said in the answer and in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change says whether the body it carries came from another path.",
    },
    {
      invariantKind: "gap",
      statement: "A change that was judged is the change that landed.",
    },
  ],
} as const satisfies Module
