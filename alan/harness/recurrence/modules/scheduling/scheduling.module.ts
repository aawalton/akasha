import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scheduling = {
  id: "01a05c6f-c7c4-7bd2-ac26-fc8ae8b38e8b",
  type: "module",
  slug: "scheduling",
  definition: "the next day a repeating thing falls due after the one it has",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A thing with no rule never advances.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next occurrence falls after the end of the logical day the reset time names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A thing with no due date yet is anchored at the reset time rather than at the clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the day moves when a recurrence advances.",
    },
  ],
} as const satisfies Module
