import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const setsSetData = {
  id: "01a0d8f1-afb4-7224-9425-49d6fb0156fe",
  type: "page-type/data-table",
  slug: "sets-set-data",
  definition: "each set's item ids, names and piece types, and which zones are dungeons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`akasha temper addon generate-set-tables` writes this table from the set pages.",
    },
  ],
} as const satisfies DataTable
