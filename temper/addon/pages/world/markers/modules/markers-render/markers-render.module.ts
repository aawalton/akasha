import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersRender = {
  id: "01a0de85-2b4c-7f33-b1da-2711a9e7a42b",
  type: "page-type/module",
  slug: "markers-render",
  definition: "the markers drawn in the world around the player",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker facing the player turns with the camera every frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker further than the culling distance is hidden.",
    },
  ],
} as const satisfies Module
