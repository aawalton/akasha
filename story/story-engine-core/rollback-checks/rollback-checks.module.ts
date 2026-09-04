import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rollbackChecks = {
  id: "01a05b71-e544-73b6-ac85-91cb6d84209e",
  pageTypeSlug: "module",
  slug: "rollback-checks",
  definition: "the tests a rollback request has to pass, and how far back one could reach",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rollback to the latest published turn or past it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A published turn carrying no turn number cannot anchor a rollback.",
    },
  ],
} as const satisfies Module
