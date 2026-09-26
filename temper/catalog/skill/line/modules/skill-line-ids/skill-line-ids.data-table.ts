import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const skillLineIds = {
  id: "01a0df08-262b-788e-be8c-027acc34f01d",
  type: "page-type/data-table",
  slug: "skill-line-ids",
  definition: "the id of every skill line a character or companion may raise",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `skill-line-ids-keeping` writes this table from the skill line pages.",
    },
  ],
} as const satisfies DataTable
