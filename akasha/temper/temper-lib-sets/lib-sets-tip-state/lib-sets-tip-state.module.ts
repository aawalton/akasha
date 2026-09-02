import type { Module } from "@akasha/code-system/module"

export const libSetsTipState = {
  id: "01a06231-8f1e-7f5a-b604-b1c73086938c",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-state",
  definition: "the mutable tooltip state holding setting flags and per-set scratch tables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One shared object holds the state for every tooltip the library touches.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch tables are cleared and refilled for each set rather than made fresh.",
    },
  ],
} as const satisfies Module
