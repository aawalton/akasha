import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellPrefixes = {
  id: "01a0daa1-79b6-7a6d-a755-7246ed051ea3",
  type: "page-type/module",
  slug: "shell-prefixes",
  definition: "the words on a shell line that run the call behind them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix names the flags that take a value and the flags that ask rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix names how many numbers of its own it takes.",
    },
  ],
} as const satisfies Module
