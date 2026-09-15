import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRotatedSession = {
  id: "01a06949-b281-7899-b4b0-fabd503cea99",
  type: "module",
  slug: "seat-rotated-session",
  definition: "a session a seat rotated away from, kept beside its page and read as a uuid",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The record beside the page is read before the page's own value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record that is no uuid falls through to the page's own value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is no uuid is never kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Clearing a rotated session drops the record beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rotated session has a key of its own apart from the current session.",
    },
  ],
} as const satisfies Module
