import type { Module } from "@akasha/code-system/module"

export const notifying = {
  id: "01a06a00-6837-71bf-b475-d3320bf5baab",
  pageTypeSlug: "module",
  slug: "notifying",
  definition: "sending one person a notification, credited to whoever asked for it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notification the caller gives no source for is credited to this module.",
    },
    {
      invariantKind: "departure",
      statement: "Alan's person slug is read from here rather than retyped at each caller.",
    },
    {
      invariantKind: "constraint",
      statement: "A notification is written through the feed rows module rather than to a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses which person a notification reaches.",
    },
    {
      invariantKind: "absence",
      statement: "No reader here crosses a network.",
    },
    {
      invariantKind: "absence",
      statement: "No type the feed rows module declares is handed on from here.",
    },
  ],
} as const satisfies Module
