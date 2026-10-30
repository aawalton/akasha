import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const defaultDifficulty = {
  id: "01a06589-d117-76d4-b8fa-fc6d9a05beb4",
  type: "page-type/number-property",
  slug: "default-difficulty",
  propertySlug: "default-difficulty",
  definition:
    "the difficulty a tracked session with no other difficulty takes from the activity its title matches",
  max: null,
  types: "ts",
  createdAt: "2026-09-03T04:32:05.911Z",
  updatedAt: "2026-10-30T16:41:31.287Z",
} as const satisfies NumberProperty
