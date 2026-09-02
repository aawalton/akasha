import type { Module } from "../../code-system/modules/module.page-type.ts"

export const verdictExit = {
  id: "01a05c87-a161-7870-a94a-5b4c8861bdc2",
  pageTypeSlug: "module",
  slug: "verdict-exit",
  definition: "the exit code a judgement's kind stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind this build cannot read exits 2.",
    },
  ],
} as const satisfies Module
