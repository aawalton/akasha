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
} as const satisfies DataTable
