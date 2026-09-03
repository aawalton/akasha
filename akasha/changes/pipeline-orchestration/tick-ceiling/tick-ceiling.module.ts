import type { Module } from "@akasha/code-system/module"

export const tickCeiling = {
  id: "01a0685e-023f-700d-b8f9-8a5b11fe7de4",
  pageTypeSlug: "module",
  slug: "tick-ceiling",
  definition: "the moment past which a tick ends rather than letting a second one start beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The ceiling is set from the moment it is made rather than from the moment it is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names what the tick was still doing when the ceiling was reached.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling reached is answered rather than thrown, and the caller throws.",
    },
  ],
} as const satisfies Module
