import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const targetTypeIds = {
  id: "01a0e0b8-162a-7d51-9d4b-c85c0efecf9c",
  type: "page-type/data-table",
  slug: "target-type-ids",
  definition: "the id of every target an ability has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `target-type-ids-keeping` writes this table from its pages.",
    },
  ],
} as const satisfies DataTable
