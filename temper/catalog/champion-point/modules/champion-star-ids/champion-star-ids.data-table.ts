import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const championStarIds = {
  id: "01a0e14a-647f-7da4-9449-863639f525dc",
  type: "page-type/data-table",
  slug: "champion-star-ids",
  definition: "the id of every champion star, the empty places included",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `champion-star-ids-keeping` writes this table from the pages.",
    },
  ],
  createdAt: "2026-09-27T05:15:44.127Z",
  updatedAt: "2026-09-27T05:15:52.000Z",
} as const satisfies DataTable
