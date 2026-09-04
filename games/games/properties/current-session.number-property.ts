import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CurrentSession = number

export const currentSession = {
  id: "01a0673c-8e0e-700a-8ba4-03b058f7cf88",
  pageTypeSlug: "number-property",
  slug: "current-session",
  propertySlug: "current-session",
  definition: "which sitting a game has reached",
  max: null,
} as const satisfies NumberProperty
