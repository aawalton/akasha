import type { Module } from "@akasha/code-system/module"

export const cyclomatic = {
  id: "01a0680f-d1b7-75cd-9668-69db68df9b0f",
  pageTypeSlug: "module",
  slug: "cyclomatic",
  definition: "the count of independent paths through a function",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function with no body counts one.",
    },
    {
      invariantKind: "departure",
      statement: "A branch inside a nested function counts against that function alone.",
    },
    {
      invariantKind: "departure",
      statement: "An optional chain is a branch.",
    },
  ],
} as const satisfies Module
