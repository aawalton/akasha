import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const auditRecordSchema = {
  id: "01a05b71-e543-7988-b1b1-86b89ad98708",
  pageTypeSlug: "module",
  slug: "audit-record-schema",
  definition:
    "the shape of a roll or a combat resolution as it is written into a game's audit trail",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record carries the hash of the record before that record.",
    },
    {
      invariantKind: "departure",
      statement: "The whole rulebook in force is stored inside a resolution record.",
    },
  ],
} as const satisfies Module
