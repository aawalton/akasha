import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPinsTooltips = {
  id: "01a06269-2908-7050-94c9-138254153608",
  type: "page-type/module",
  slug: "destinations-pins-tooltips",
  definition: "the tooltip written for a destination pin on keyboard and gamepad",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin's tooltip carries the same lines by gamepad as by keyboard.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.088Z",
  updatedAt: "2026-09-25T18:35:33.000Z",
} as const satisfies Module
