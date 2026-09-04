import type { Module } from "@akasha/code-system/module"

export const patching = {
  id: "01a06303-cba2-7ada-9cb8-d1b24bf3bd62",
  pageTypeSlug: "module",
  slug: "patching",
  definition: "the git-format patch a set of changes makes against a base commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A patch is built in an index file of its own rather than in the repository's index.",
    },
    {
      invariantKind: "departure",
      statement: "Building a patch changes no file in the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "Only the paths a change names are compared against the base.",
    },
    {
      invariantKind: "departure",
      statement: "A body the same as the one at the base leaves nothing in the patch.",
    },
    {
      invariantKind: "departure",
      statement: "A patch over no changes is nothing rather than an empty diff.",
    },
    {
      invariantKind: "departure",
      statement: "A change stating no body is a deletion.",
    },
    {
      invariantKind: "departure",
      statement: "A body emptied is not a deletion.",
    },
    {
      invariantKind: "departure",
      statement: "A blob a patch names is written in full rather than abbreviated.",
    },
    {
      invariantKind: "departure",
      statement: "A result blob of all zeros is a deletion rather than a body.",
    },
    {
      invariantKind: "departure",
      statement: "A base blob of all zeros is a path the base commit did not hold.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is recovered from the result blob a patch names rather than by applying the patch.",
    },
    {
      invariantKind: "departure",
      statement: "Rename detection is off so each path a patch carries is one entry.",
    },
    {
      invariantKind: "departure",
      statement: "A line inside a hunk is never read as a header.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch index is swept whether the patch was built or refused.",
    },
    {
      invariantKind: "departure",
      statement: "A blob a patch names is kept from git's pruning of unreachable objects.",
    },
    {
      invariantKind: "departure",
      statement: "A ref over a tree of the bodies a patch leaves is what keeps those blobs.",
    },
    {
      invariantKind: "departure",
      statement: "One ref keeps every blob one patch names.",
    },
    {
      invariantKind: "departure",
      statement: "A ref is named for the file the patch is kept in.",
    },
    {
      invariantKind: "departure",
      statement: "A deletion names no blob to keep.",
    },
    {
      invariantKind: "departure",
      statement: "Taking away a ref that was never there is no fault.",
    },
  ],
} as const satisfies Module
