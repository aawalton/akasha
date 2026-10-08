import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const targetScopeIds = {
  id: "01a0e0b7-bac6-7e7e-bcc4-af5e8716df4c",
  type: "page-type/data-table",
  slug: "target-scope-ids",
  definition: "the id of every shape of ground an ability covers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `target-scope-ids-keeping` writes this table from its pages.",
    },
  ],
  createdAt: "2026-09-27T02:35:32.422Z",
  updatedAt: "2026-09-27T02:35:36.000Z",
} as const satisfies DataTable
