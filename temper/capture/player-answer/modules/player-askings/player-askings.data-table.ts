import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const playerAskings = {
  id: "01a0d574-4e8a-736f-9c42-f91500b07c1d",
  type: "page-type/data-table",
  slug: "player-askings",
  definition: "the functions a capture of the character asks, by the shape of the values asked",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is code, because the add-on compiles it in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape the capture knows how to list is kept even where no function has it.",
    },
  ],
} as const satisfies DataTable
