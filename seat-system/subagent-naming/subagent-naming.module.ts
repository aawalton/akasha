import type { Module } from "@akasha/code-system/module"

export const subagentNaming = {
  id: "01a06949-b281-7ea1-9435-503a9b97d864",
  pageTypeSlug: "module",
  slug: "subagent-naming",
  definition: "how a subagent's name carries the seat above it, joined by a double hyphen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The mark between the two names is two hyphens.",
    },
    {
      invariantKind: "departure",
      statement: "A name is split at the first mark rather than the last.",
    },
    {
      invariantKind: "departure",
      statement: "A name opening with the mark names no seat above it.",
    },
    {
      invariantKind: "departure",
      statement: "A name with nothing after the mark names no subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A name without the mark belongs to a seat rather than a subagent.",
    },
  ],
} as const satisfies Module
