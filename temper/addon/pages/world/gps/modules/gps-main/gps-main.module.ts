import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsMain = {
  id: "01a0614d-4764-7fb9-bcd4-a7fca9ec796d",
  type: "page-type/module",
  slug: "gps-main",
  definition: "the wiring this feature does as the bundle loads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map hooks are in place before the add-on says it has loaded.",
    },
  ],
} as const satisfies Module
