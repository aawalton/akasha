import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsApi = {
  id: "01a0614d-475f-7750-9fee-976d2964bf0f",
  type: "page-type/module",
  slug: "gps-api",
  definition: "the coordinate functions the library object carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reaching a function before this feature is initialized is an error.",
    },
  ],
} as const satisfies Module
