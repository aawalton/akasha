import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsTamrielOMeter = {
  id: "01a0614d-4765-7fe3-9655-5d4e74a775dc",
  type: "page-type/module",
  slug: "gps-tamriel-o-meter",
  definition: "measuring a map against Tamriel and holding what was measured",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A map already measured is not measured again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Measuring moves the shown map and then puts the original map back.",
    },
  ],
  createdAt: "2026-09-02T08:47:29.637Z",
  updatedAt: "2026-09-22T03:58:40.000Z",
} as const satisfies Module
