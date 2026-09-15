import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recurrenceShape = {
  id: "01a05c6f-c7c3-732d-8113-3c8b675fd74f",
  type: "module",
  slug: "recurrence-shape",
  definition: "what a repeating thing has, and what advancing it answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rule a repeating thing has may be absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An advanced due date always names a day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An advanced due date names a time only where a time was already held.",
    },
  ],
} as const satisfies Module
