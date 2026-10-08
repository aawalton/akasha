import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zonePublicDungeonMapIds = {
  id: "01a061e7-932b-7225-832d-ef81c5e7cac2",
  type: "page-type/module",
  slug: "zone-public-dungeon-map-ids",
  definition: "which maps the game treats as a public dungeon",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.579Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
