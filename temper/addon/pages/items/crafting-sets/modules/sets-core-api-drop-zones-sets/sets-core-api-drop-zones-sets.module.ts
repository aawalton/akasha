import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiDropZonesSets = {
  id: "01a06231-8f1d-7d70-9ac2-92d18df83cb2",
  type: "page-type/module",
  slug: "sets-core-api-drop-zones-sets",
  definition: "which zones and named locations a set drops in, and which sets drop in a given zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An item id whose link the game cannot name is removed from the cache for this API version.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.205Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
