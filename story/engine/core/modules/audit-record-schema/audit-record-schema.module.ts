import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditRecordSchema = {
  id: "01a05b71-e543-7988-b1b1-86b89ad98708",
  type: "page-type/module",
  slug: "audit-record-schema",
  definition:
    "the shape of a roll or a combat resolution as it is written into a game's audit trail",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record has the hash of the record before that record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole rulebook in force is stored inside a resolution record.",
    },
  ],
} as const satisfies Module
