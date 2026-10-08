import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLoad = {
  id: "01a06129-7a21-7959-af2e-c0db6ac6ac25",
  type: "page-type/module",
  slug: "housing-load",
  definition: "what the housing add-on does once the game has loaded the add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading begins the port-to-friend part and nothing else.",
    },
  ],
  createdAt: "2026-09-02T08:08:23.329Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
