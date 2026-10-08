import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const defaultDifficulty = {
  id: "01a06589-d117-76d4-b8fa-fc6d9a05beb4",
  type: "page-type/number-property",
  slug: "default-difficulty",
  propertySlug: "default-difficulty",
  definition:
    "the difficulty a session takes where its title names this activity and nothing else says",
  max: null,
  types: "ts",
  createdAt: "2026-09-03T04:32:05.911Z",
  updatedAt: "2026-09-15T15:55:06.000Z",
} as const satisfies NumberProperty
