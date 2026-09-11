import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const towerSessions = {
  id: "01a0673e-1000-7004-8655-cf8314de2955",
  type: "file-property",
  slug: "tower-sessions",
  propertySlug: "tower-sessions",
  definition: "the sittings a tower game has been climbed in",
  extensions: ["jsonl"],
  types: "ts",
} as const satisfies FileProperty
