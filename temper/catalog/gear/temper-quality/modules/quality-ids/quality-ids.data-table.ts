import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const qualityIds = {
  id: "01a0e0a8-7160-7325-a884-02309bdc787e",
  type: "page-type/data-table",
  slug: "quality-ids",
  definition: "the id of every quality a piece of equipment may be made at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `quality-ids-keeping` writes this table from the quality pages.",
    },
  ],
} as const satisfies DataTable
