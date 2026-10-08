import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonLayout = {
  id: "01a11ce3-7135-7fbc-b63b-1b582275bf1b",
  type: "page-type/module",
  slug: "hud-addon-layout",
  definition: "where each cell of the bar sits, worked out from how wide its text is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell is as wide as its text and never narrower than a column.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each cell starts one gap after the cell before it ends, so no two cells overlap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell with no text takes no room on the bar.",
    },
  ],
  createdAt: "2026-10-08T19:00:30.132Z",
  updatedAt: "2026-10-08T19:00:30.132Z",
} as const satisfies Module
