import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const fogReportSchema = {
  id: "01a05b71-e543-739d-9f6e-61877fc1f790",
  pageTypeSlug: "module",
  slug: "fog-report-schema",
  definition: "one seat's report of what it counted this turn and what it pointed at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report names which seat made that report.",
    },
  ],
} as const satisfies Module
