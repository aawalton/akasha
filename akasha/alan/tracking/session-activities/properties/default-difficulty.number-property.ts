import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DefaultDifficulty = number

export const defaultDifficulty = {
  id: "01a0657a-f73c-78c9-bfb4-76a7d9eb7594",
  pageTypeSlug: "number-property",
  slug: "default-difficulty",
  propertySlug: "default-difficulty",
  definition:
    "the difficulty a session takes where its title names this activity and nothing else says",
  max: null,
} as const satisfies NumberProperty
