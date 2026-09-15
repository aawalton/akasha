import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const committing = {
  id: "01a0501a-b83f-7707-afd1-d497b00b4868",
  type: "module",
  slug: "committing",
  definition: "the commit a landing makes, and the proof that it carries the change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit answered for a change is a commit with that change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit is built from trees rather than staged through the git index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the git index would not take refuses the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A blob's mode is read off the disk a change wrote rather than off the commit that change lands onto.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file its owner may run lands at 100755 and any other file lands at 100644.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bit read is the bit a file's owner runs by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is no plain file on disk keeps the mode the last commit recorded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One mode is given to the tree and to the git index for one path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mode changed with the body left alone is a change and commits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the trees along a changed path are built again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The git index is written after the branch moves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change the branch refuses leaves the git index as it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw after the branch moves leaves the git index behind the branch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index behind the branch is put right by the next change over those paths.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A git index another process holds is waited for rather than refusing the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything else git refuses is thrown on the first attempt rather than waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait on the index gives up after thirty seconds and throws the words git said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Moving the branch is the one act that lands the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A branch no longer at the commit the change was built onto refuses the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change asking for the tree that is already there commits nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change asking for the tree that is already there answers as nothing rather than as a commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit no writer is named for is authored by akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit names its writer as committer as well as author.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A checkout configured with no git user commits as every other checkout does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words git says on the error stream are caught rather than shown.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here indexes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A caller has written the files that caller asked for before this module is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A caller puts back the files that caller asked for itself where this module throws.",
    },
  ],
} as const satisfies Module
