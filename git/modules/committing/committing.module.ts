import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const committing = {
  id: "01a0501a-b83f-7707-afd1-d497b00b4868",
  type: "page-type/module",
  slug: "committing",
  definition: "the commit a landing makes, and the proof that it carries the change",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit answered for a change is a commit with that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit is built from trees rather than staged through the git index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the git index would not take refuses the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blob's mode is read off the disk a change wrote rather than off the commit that change lands onto.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file its owner may run lands at 100755 and any other file lands at 100644.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bit read is the bit a file's owner runs by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that is no plain file on disk keeps the mode the last commit recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One mode is given to the tree and to the git index for one path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mode changed with the body left alone is a change and commits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the trees along a changed path are built again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every folder those trees are built from is listed in one call rather than each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a commit writes is hashed in one call rather than each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is hashed from the body on disk rather than from the bytes handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trees at one depth are made in one call, deepest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The git index is written after the branch moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may take that write to run once the caller has let its hold go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change the branch refuses leaves the git index as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw after the branch moves leaves the git index behind the branch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index behind the branch is put right by the next change over those paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A git index another process holds is waited for rather than refusing the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything else git refuses is thrown on the first attempt rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait on the index gives up after thirty seconds and throws the words git said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Moving the branch is the one act that lands the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch no longer at the commit the change was built onto refuses the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change asking for the tree that is already there commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change asking for the tree that is already there answers as nothing rather than as a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit no writer is named for is authored by akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit names its writer as committer as well as author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout configured with no git user commits as every other checkout does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words git says on the error stream are caught rather than shown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here indexes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A caller has written the files that caller asked for before this module is reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A caller puts back the files that caller asked for itself where this module throws.",
    },
  ],
} as const satisfies Module
