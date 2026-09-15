import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const complexityRowing = {
  id: "01a08ccb-ef46-7d67-8b4e-cc41cae3762e",
  type: "module",
  slug: "complexity-rowing",
  definition: "the rows a complexity metric answers",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cyclomatic row is one function and a maintainability row is one file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are ordered worst first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Worst is the highest complexity and the lowest maintainability index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A threshold is a floor for every metric but the maintainability index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A threshold is a ceiling for the maintainability index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not open is passed over rather than refusing the rest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope with no row is answered empty rather than refused.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "The workspace read is the workspace the process is in rather than the root the call names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a figure against a limit.",
    },
  ],
} as const satisfies Module
