import type { FileProperty } from "@akasha/pages-system/file-property"

export type TowerSessions = "jsonl"

export const towerSessions = {
  id: "01a0673e-1000-7004-8655-cf8314de2955",
  pageTypeSlug: "file-property",
  slug: "tower-sessions",
  propertySlug: "tower-sessions",
  definition: "the sittings a tower game has been climbed in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
