import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const defaultDifficulty = {
  id: "01a06589-d117-76d4-b8fa-fc6d9a05beb4",
  type: "number-property",
  slug: "default-difficulty",
  propertySlug: "default-difficulty",
  definition:
    "the difficulty a session takes where its title names this activity and nothing else says",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
