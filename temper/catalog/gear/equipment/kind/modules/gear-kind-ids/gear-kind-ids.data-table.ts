import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const gearKindIds = {
  id: "01a0e0c4-2114-75e2-a8a0-3952696030ba",
  type: "page-type/data-table",
  slug: "gear-kind-ids",
  definition: "the id of every armor, jewelry and weapon slot and every armor weight",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `gear-kind-ids-keeping` writes this table from the pages.",
    },
  ],
  createdAt: "2026-09-27T02:49:05.044Z",
  updatedAt: "2026-09-27T02:49:23.000Z",
} as const satisfies DataTable
