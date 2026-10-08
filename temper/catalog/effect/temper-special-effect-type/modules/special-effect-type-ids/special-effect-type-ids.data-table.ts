import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const specialEffectTypeIds = {
  id: "01a0e0b7-5e01-7e18-8b83-ef3f18c975d9",
  type: "page-type/data-table",
  slug: "special-effect-type-ids",
  definition: "the id of every kind of effect written as an act rather than as a number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `special-effect-type-ids-keeping` writes this table from its pages.",
    },
  ],
  createdAt: "2026-09-27T02:35:08.673Z",
  updatedAt: "2026-09-27T02:35:12.000Z",
} as const satisfies DataTable
