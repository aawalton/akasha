import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsMeasurement = {
  id: "01a0614d-4764-731d-9019-8c924987851d",
  type: "page-type/module",
  slug: "gps-measurement",
  definition: "the scale and offset that carry a map's coordinates onto Tamriel's",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A measurement is taken once for a map and kept.",
    },
  ],
} as const satisfies Module
