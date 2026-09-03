import type { Module } from "@akasha/code-system/module"

export const seatSessionRename = {
  id: "01a0687e-534d-7000-bad8-47a890a18ce1",
  pageTypeSlug: "module",
  slug: "seat-session-rename",
  definition: "the tmux session a renamed seat sits in, moved to the seat's new name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat with no session standing under its old name is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A rename onto a name a live session already holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A session name is matched exactly rather than as a prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A rename that does not happen is said in the words that follow the rename.",
    },
    {
      invariantKind: "departure",
      statement: "A rename that leaves the seat where it was says nothing.",
    },
  ],
} as const satisfies Module
