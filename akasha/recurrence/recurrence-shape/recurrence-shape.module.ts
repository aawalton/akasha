import type { Module } from "@akasha/code-system/module"

export const recurrenceShape = {
  id: "01a05c6f-c7c3-732d-8113-3c8b675fd74f",
  pageTypeSlug: "module",
  slug: "recurrence-shape",
  definition: "what a repeating thing carries, and what advancing it answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rule a repeating thing holds may be absent.",
    },
    {
      invariantKind: "departure",
      statement: "An advanced due date always names a day.",
    },
    {
      invariantKind: "departure",
      statement: "An advanced due date names a time only where a time was already held.",
    },
  ],
} as const satisfies Module
