import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsMapAdapter = {
  id: "01a0614d-4764-7590-90c4-082d02d03370",
  type: "page-type/module",
  slug: "gps-map-adapter",
  definition: "the game's map changing functions wrapped so a change can be measured",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own function is called first and its result is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function the game does not define is left unwrapped.",
    },
  ],
  createdAt: "2026-09-02T08:47:29.636Z",
  updatedAt: "2026-09-22T03:58:40.000Z",
} as const satisfies Module
