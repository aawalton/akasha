import type { Module } from "@akasha/code-system/module"

export const zonePublicDungeonMapIds = {
  id: "01a061e7-932b-7225-832d-ef81c5e7cac2",
  pageTypeSlug: "module",
  slug: "zone-public-dungeon-map-ids",
  definition: "which maps the game treats as a public dungeon",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
