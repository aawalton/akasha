import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const setsSetInfo = {
  id: "01a0d8f1-afb5-76c9-8e74-b1204c99fabb",
  type: "page-type/data-table",
  slug: "sets-set-info",
  definition: "each set's kind, drop ways, places, release and veteran slots, by set id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`akasha temper addon generate-set-tables` writes this table from the set pages.",
    },
  ],
} as const satisfies DataTable
