import type { Module } from "@akasha/code/module"

export const drafting = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  pageTypeSlug: "module",
  type: "module",
  slug: "drafting",
  definition: "the bodies a change leaves, and what a run of those bodies does",
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
      statement:
        "A body carries the body its path held at the commit the change was worked out on.",
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
      invariantKind: "departure",
      statement: "The commit at HEAD is read from git rather than carried by a caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here merges, as a change is replayed onto the commit at HEAD instead.",
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
