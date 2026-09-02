import type { Module } from "@akasha/code-system/module"

export const completionSummaryAccount = {
  id: "01a063a1-6ec3-7070-a4c2-0e4e020a6407",
  pageTypeSlug: "module",
  slug: "completion-summary-account",
  definition: "the numbers an account's summary card shows, folded from that account's progress",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The progress folded here arrives as separate arguments rather than in one bundle.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a catalog.",
    },
  ],
} as const satisfies Module
