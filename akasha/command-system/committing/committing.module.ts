import type { Module } from "@akasha/code-system/module"

export const committing = {
  id: "01a0501a-b83f-7707-afd1-d497b00b4868",
  pageTypeSlug: "module",
  slug: "committing",
  definition: "the commit a landing makes, and the proof that it carries the change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A commit answered for a change is a commit carrying that change.",
    },
    {
      invariantKind: "departure",
      statement: "A commit is built from trees rather than staged through the git index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the git index would not take refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "Only the trees along a changed path are built again.",
    },
    {
      invariantKind: "departure",
      statement: "The git index is written before the branch moves.",
    },
    {
      invariantKind: "departure",
      statement: "A git index another process holds is waited for rather than refusing the change.",
    },
    {
      invariantKind: "departure",
      statement: "Anything else git refuses is thrown on the first attempt rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A wait on the index gives up after thirty seconds and throws what git said.",
    },
    {
      invariantKind: "departure",
      statement: "Moving the branch is the one act that lands the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A branch no longer at the commit the change was built onto refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "A change asking for what already stands commits nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change asking for what already stands answers as nothing rather than as a commit.",
    },
    {
      invariantKind: "departure",
      statement: "A commit no writer is named for is authored by akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A commit names its writer as committer as well as author.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout configured with no git user commits as any other does.",
    },
    {
      invariantKind: "departure",
      statement: "What git says on the error stream is caught rather than shown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here indexes.",
    },
    {
      invariantKind: "absence",
      statement: "A caller has written what it asked for before this is reached.",
    },
    {
      invariantKind: "absence",
      statement: "A caller puts back what it asked for itself where this throws.",
    },
  ],
} as const satisfies Module
