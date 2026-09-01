import type { Module } from "@akasha/code-system/module"

export const scheduling = {
  id: "01a05c6f-c7c4-7bd2-ac26-fc8ae8b38e8b",
  pageTypeSlug: "module",
  slug: "scheduling",
  definition: "the next day a repeating thing falls due after the one it holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A thing holding no rule never advances.",
    },
    {
      invariantKind: "departure",
      statement: "The next occurrence falls after the end of the logical day the reset time names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A thing with no due date yet is anchored at the reset time rather than at the clock.",
    },
    {
      invariantKind: "departure",
      statement: "Only the day moves when a recurrence advances.",
    },
  ],
} as const satisfies Module
