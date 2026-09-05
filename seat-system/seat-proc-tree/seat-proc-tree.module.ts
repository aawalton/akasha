import type { Module } from "@akasha/code-system/module"

export const seatProcTree = {
  id: "01a0686d-9d5e-700a-b949-3878b576dfa8",
  pageTypeSlug: "module",
  slug: "seat-proc-tree",
  definition:
    "the shape of an agent's processes: which child is the main one, and which whole trees it has outlived",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A child of the supervisor asking is preferred to a child of anything else.",
    },
    {
      invariantKind: "departure",
      statement:
        "The main child is the newest where every candidate is timed and the highest pid where any is not.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose processes form one tree has outlived none of them.",
    },
    {
      invariantKind: "departure",
      statement: "The tree kept is the tree holding the stated keeper.",
    },
    {
      invariantKind: "departure",
      statement: "Where no keeper is stated, the tree kept is the tree holding the newest process.",
    },
    {
      invariantKind: "departure",
      statement: "A process the caller is running in is never read as another agent's process.",
    },
  ],
} as const satisfies Module
