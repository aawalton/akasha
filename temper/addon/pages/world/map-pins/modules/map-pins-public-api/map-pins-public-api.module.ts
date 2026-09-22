import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsPublicApi = {
  id: "01a06062-57e1-7ce0-8c2d-76ec355c8351",
  type: "page-type/module",
  slug: "map-pins-public-api",
  definition: "the name another feature imports to put a pin on the world map",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other feature reaches this feature through this one export.",
    },
  ],
} as const satisfies Module
