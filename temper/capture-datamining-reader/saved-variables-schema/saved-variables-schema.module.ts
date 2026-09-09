import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const savedVariablesSchema = {
  id: "01a0609d-90df-725b-9ebe-3417953f530a",
  pageTypeSlug: "module",
  slug: "saved-variables-schema",
  definition: "the zod shape one datamining saved-variables file is read through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An object here turns away a key the zod shape leaves out.",
    },
    {
      invariantKind: "departure",
      statement: "The account-wide shape is checked against the datamining payload type.",
    },
    {
      invariantKind: "departure",
      statement: "A mined item is keyed by a number the saved-variables file wrote as text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
