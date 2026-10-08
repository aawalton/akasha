import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tableFunctionTypes = {
  id: "01a06052-2ca5-7438-a4c4-749daaf6f554",
  type: "page-type/module",
  slug: "table-function-types",
  definition: "the shape of the table helpers the game global carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every helper is called as a method.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The self a helper takes is the library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The library states a version number.",
    },
  ],
  createdAt: "2026-09-02T04:13:13.253Z",
  updatedAt: "2026-09-21T22:32:47.000Z",
} as const satisfies Module
