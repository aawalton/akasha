import type { Module } from "@akasha/code/module"

export const drafting = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  pageTypeSlug: "module",
  type: "module",
  slug: "drafting",
  definition: "the bodies a change leaves, carried against a base and rebased onto HEAD",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is carried as the bytes that body is rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "One rule rebases bodies onto a commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rebase says which paths the commit at HEAD holds a body other than the base at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the commit at HEAD holds nothing at is followed to the path a rename left that body at.",
    },
    {
      invariantKind: "departure",
      statement: "A path followed through a rename is followed again through the next rename.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body at a path renamed away is merged onto the body at the path the rename left.",
    },
    {
      invariantKind: "departure",
      statement: "A rename reaching a path these bodies already carry refuses the rebase.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away by no rename is carried as a conflict.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict left by a path taken away marks the body carried at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling no text at a path taken away refuses the rebase.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved under the change is merged rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "The body the commit at HEAD holds becomes the base the rebased bodies carry.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks a change kind runs and the readings that kind owes are what a run of it does.",
    },
    {
      invariantKind: "departure",
      statement: "A call with no change kind runs every check and owes every reading.",
    },
    {
      invariantKind: "departure",
      statement: "What a path's readers owe is read off only the paths saying so.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the worktree.",
    },
    {
      invariantKind: "gap",
      statement:
        "What a run does about checks and readings is a second concern, so this is more than one module.",
    },
    {
      invariantKind: "gap",
      statement: "The slug names drafting, and nothing here drafts.",
    },
  ],
} as const satisfies Module
