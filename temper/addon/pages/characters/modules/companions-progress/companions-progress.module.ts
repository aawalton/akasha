import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsProgress = {
  id: "01a0611d-84de-7012-b6a4-85e9b16fe633",
  type: "page-type/module",
  slug: "companions-progress",
  definition: "recording a companion's experience, rapport and skill line ranks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Progress is recorded per companion rather than per character.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.646Z",
  updatedAt: "2026-09-22T01:32:08.000Z",
} as const satisfies Module
