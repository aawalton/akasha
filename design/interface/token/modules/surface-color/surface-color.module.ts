import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surfaceColor = {
  id: "01a0ca09-254b-75d8-aca5-c4acfedbb872",
  type: "page-type/module",
  slug: "surface-color",
  definition: "the greys a surface is drawn in, by how far that surface sits above the one behind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A surface lightens as that surface comes nearer the reader.",
    },
  ],
} as const satisfies Module
