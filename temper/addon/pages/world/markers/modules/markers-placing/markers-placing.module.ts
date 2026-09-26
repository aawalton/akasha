import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersPlacing = {
  id: "01a0de85-2b4b-789a-afb5-da6521ef3067",
  type: "page-type/module",
  slug: "markers-placing",
  definition: "markers placed and removed at the player's feet or at the reticle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is placed or removed while more than one profile is loaded.",
    },
  ],
} as const satisfies Module
