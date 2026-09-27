import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const statusEffectTypeIds = {
  id: "01a0e0b6-d3f1-73ff-9c48-368add0ffd40",
  type: "page-type/data-table",
  slug: "status-effect-type-ids",
  definition: "the id of every kind of condition a hit leaves on its target",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `status-effect-type-ids-keeping` writes this table from its pages.",
    },
  ],
} as const satisfies DataTable
