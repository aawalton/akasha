import type { Module } from "@akasha/code-system/module"

export const seatRotatedSession = {
  id: "01a06949-b281-7899-b4b0-fabd503cea99",
  pageTypeSlug: "module",
  slug: "seat-rotated-session",
  definition: "a session a seat rotated away from, kept beside its page and read as a uuid",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The record beside the page is read before the page's own value.",
    },
    {
      invariantKind: "departure",
      statement: "A record that is no uuid falls through to what the page says.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is no uuid is never kept.",
    },
    {
      invariantKind: "departure",
      statement: "Clearing a rotated session drops the record beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "The rotated session has a key of its own, apart from the current session.",
    },
  ],
} as const satisfies Module
