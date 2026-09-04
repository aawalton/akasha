import type { Module } from "@akasha/code-system/module"

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
      statement: "A change is a base commit and the bodies the change would leave.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the change does not touch is read from the base commit rather than from the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies the change does not touch are read through one git process for the whole judging.",
    },
    {
      invariantKind: "departure",
      statement: "That git process is ended when the judging ends however the judging ends.",
    },
    {
      invariantKind: "departure",
      statement: "A change may state the commit its bodies were read against.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a change states is taken by any name git resolves to one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A name resolving to no commit refuses the change unwritten.",
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
        "A change stating no commit the change was read against is taken as read against what is checked out.",
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
      statement: "What was written is put back when anything after the writing throws.",
    },
    {
      invariantKind: "departure",
      statement: "What is put back is the base commit's bodies.",
    },
    {
      invariantKind: "departure",
      statement: "The index is put back with the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "What was staged for a commit that threw is unstaged with the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A repair that fails leaves the fault that caused the repair to be thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A repair that fails is said along with the fault that caused the repair.",
    },
    {
      invariantKind: "departure",
      statement: "A change may name paths carried on disk rather than written and committed.",
    },
    {
      invariantKind: "departure",
      statement: "Those paths are carried after the index is settled and before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that throws puts back the carries made before that carry in reverse.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that throws puts back every carry made for that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left holding nothing by a path taken away is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left holding nothing by a path carried away is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The folders are cleared after the commit rather than before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change that commits nothing clears the folders its paths left empty.",
    },
    {
      invariantKind: "departure",
      statement: "The folders cleared are answered alongside what was written and what was taken.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws clears no folder.",
    },
    {
      invariantKind: "departure",
      statement: "A hold runs from the first write to the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is kept while a repair waits on the git index.",
    },
    {
      invariantKind: "departure",
      statement: "A change is judged before the hold is taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is judged against the commit the change read rather than the commit the change lands on.",
    },
    {
      invariantKind: "departure",
      statement: "A commit landing while a change is judged does not refuse that change.",
    },
    {
      invariantKind: "departure",
      statement: "A change that never took the hold is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws has committed nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws has carried nothing.",
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
      statement: "A run may gate and report leaving no file behind.",
    },
    {
      invariantKind: "departure",
      statement: "A run may gate and report leaving no loose object behind.",
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
      statement: "Only writing without gating carries past the checks that will not load.",
    },
    {
      invariantKind: "departure",
      statement: "Why they would not load is said in the answer and in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change says whether the body the change carries came from another path.",
    },
    {
      invariantKind: "departure",
      statement: "A change may be drafted into an agent's patch rather than written onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A draft is judged by the checks a landing is judged by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft is judged against what the patch would hold rather than the change alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch holds is judged whether or not the draft names that path.",
    },
    {
      invariantKind: "departure",
      statement: "A draft and an apply are judged over the same bodies.",
    },
    {
      invariantKind: "departure",
      statement: "What a draft was judged over is answered alongside what was drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A draft is held to the bodies its writer read as a landing is.",
    },
    {
      invariantKind: "departure",
      statement: "One rule answers whether a landing and a draft are held to what was read.",
    },
    {
      invariantKind: "departure",
      statement: "A draft takes no hold over the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft writes no file in the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft makes no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A draft a conflict refused leaves the patch as the patch was.",
    },
    {
      invariantKind: "departure",
      statement: "A draft answers which paths the patch carries a conflict at.",
    },
  ],
} as const satisfies Module
