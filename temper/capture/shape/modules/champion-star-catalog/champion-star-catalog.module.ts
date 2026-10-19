import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const championStarCatalog = {
  id: "01a1565d-4f7b-7864-981b-8e14568d543f",
  type: "page-type/module",
  slug: "champion-star-catalog",
  definition: "the shape each champion star's points are written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A star is kept under the number the game gives that star.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star states the most points it takes and whether it is slottable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star states its jump points in the order the game answers them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star with no jump points states none.",
    },
  ],
  createdAt: "2026-10-19T22:51:58.202Z",
  updatedAt: "2026-10-19T22:51:58.202Z",
} as const satisfies Module
