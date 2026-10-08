import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsWorldSize = {
  id: "01a0614d-4766-7a5a-b36b-152682f53e3d",
  type: "page-type/module",
  slug: "gps-world-size",
  definition: "how far across a map reaches in the world's own units",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A world size is written to a string and read back from that string.",
    },
  ],
  createdAt: "2026-09-02T08:47:29.638Z",
  updatedAt: "2026-09-22T03:58:40.000Z",
} as const satisfies Module
