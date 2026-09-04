import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DefaultDifficulty = number

export const defaultDifficulty = {
  id: "01a06589-d117-76d4-b8fa-fc6d9a05beb4",
  pageTypeSlug: "number-property",
  slug: "default-difficulty",
  propertySlug: "default-difficulty",
  definition:
    "the difficulty a session takes where its title names this activity and nothing else says",
  max: null,
} as const satisfies NumberProperty
