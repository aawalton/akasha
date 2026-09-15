import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueSpelling = {
  id: "01a09c7f-02d4-712d-999d-c1305ea06fcf",
  type: "module",
  slug: "value-spelling",
  definition:
    "the literal a page body spells for one value handed in as text under the kind its property holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value under a property holding a boolean is spelled bare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value under a property holding a number is spelled bare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value under any other property is spelled as JSON spells it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value the kind stated does not hold is spelled as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind stated as nothing spells the value as JSON spells it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a body or an index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which key the value is written under.",
    },
  ],
} as const satisfies Module
