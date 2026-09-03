import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const weeklyCoverage = {
  id: "01a0685e-89d5-7ccb-91b7-b952b7b5d1f4",
  pageTypeSlug: "module",
  slug: "weekly-coverage",
  definition: "which patterns the week has already trained and which it still owes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Coverage is read from what was performed rather than from what was planned.",
    },
    {
      invariantKind: "departure",
      statement: "Any one of the core anti-patterns covers the core for the week.",
    },
    {
      invariantKind: "departure",
      statement: "Alternating counts as unilateral.",
    },
    {
      invariantKind: "departure",
      statement: "Upper and lower unilateral work are covered apart from each other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pattern and a laterality together are one key a session repeats no more than once.",
    },
  ],
} as const satisfies Module
