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
  createdAt: "2026-09-02T08:47:29.636Z",
  updatedAt: "2026-09-22T10:19:01.000Z",
} as const satisfies Module
