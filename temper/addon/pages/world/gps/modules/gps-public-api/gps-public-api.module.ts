import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsPublicApi = {
  id: "01a0614d-4765-7157-8e3b-883d7c925f1a",
  type: "page-type/module",
  slug: "gps-public-api",
  definition: "the name opening this feature's measurements to the rest of the bundle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature outside this one names this module and no other module here.",
    },
  ],
} as const satisfies Module
