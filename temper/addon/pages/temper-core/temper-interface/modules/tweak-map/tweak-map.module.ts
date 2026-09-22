import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakMap = {
  id: "01a06115-1acf-7c2b-b2a3-d70d8fd0f32b",
  type: "page-type/module",
  slug: "tweak-map",
  definition: "the world map behaviour the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard stands behind the table guards here.",
    },
  ],
} as const satisfies Module
