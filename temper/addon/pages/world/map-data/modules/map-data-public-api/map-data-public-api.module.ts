import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataPublicApi = {
  id: "01a061e1-aeb1-7d98-8492-0c8d3bfad094",
  type: "page-type/module",
  slug: "map-data-public-api",
  definition: "the names the rest of the bundle uses for this feature's state",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature outside this one names this module and no other module here.",
    },
  ],
  createdAt: "2026-09-02T11:29:35.409Z",
  updatedAt: "2026-09-22T13:49:27.000Z",
} as const satisfies Module
