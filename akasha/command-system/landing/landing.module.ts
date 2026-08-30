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
        "A body the change does not touch is read from the base commit, never from the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies the change does not touch are read through one git process for the whole judging, not one for each.",
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
      statement:
        "A change may state the commit its bodies were read against, and a path that moved between that commit and what stands is refused unwritten rather than written over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit landing elsewhere in the repository moves no path this change carries, so this change is not refused for it.",
    },
    {
      invariantKind: "absence",
      statement:
        "A change stating no commit it was read against is taken as read against what stands, because a body given from outside was never read from this repository at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is overwritten only where what stands on disk is the body its writer read, and one that moved is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change commits only where no commit reaching `akasha/` landed between the base it read and the writing, and one that did is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "What was written is put back when anything after the writing throws, so a call that commits nothing leaves nothing behind either.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is put back is the base commit's bodies, so a body standing apart from the base before the writing is not the body put back.",
    },
    {
      invariantKind: "gap",
      statement:
        "The index is not put back with the bodies, so a landing that throws part way through settling leaves it to be built again.",
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
        "The index is reached only to keep it, so a refused change and a dry run never ask it to load.",
    },
    {
      invariantKind: "departure",
      statement:
        "Checks that will not load refuse the change; only writing without gating carries past them, and why they would not load is said in the answer and in the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change says whether the body it carries came from another path, because what a page being created is given is not given again to one that only moved.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing may be handed work to do once the checks have passed and before anything is written, so a value a refusal must not spend is worked out only where there will be no refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "Work handed in that way may add paths to the change, and what stood at each is read before any of it is written, so a failure puts every one of them back.",
    },
    {
      invariantKind: "gap",
      statement: "A change that was judged is the change that landed.",
    },
  ],
} as const satisfies Module
