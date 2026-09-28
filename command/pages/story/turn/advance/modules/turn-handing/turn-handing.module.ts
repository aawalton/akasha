import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnHanding = {
  id: "01a0e949-667e-7c20-a21e-7af61ed6ae8c",
  type: "page-type/module",
  slug: "turn-handing",
  definition: "what one step hands in to a played turn's advance, read off the call",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance naming no step's output hands in the world builder's lore.",
    },
  ],
} as const satisfies Module
