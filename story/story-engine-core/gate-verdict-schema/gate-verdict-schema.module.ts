import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gateVerdictSchema = {
  id: "01a05b71-e543-77c1-a225-884ceec89257",
  pageTypeSlug: "module",
  slug: "gate-verdict-schema",
  definition: "the judgement passed on a turn at the gate, dimension by dimension",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict covers every dimension in the registry.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict names no dimension the verdict already named.",
    },
  ],
} as const satisfies Module
