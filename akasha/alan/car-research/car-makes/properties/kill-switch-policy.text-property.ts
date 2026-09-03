import type { TextProperty } from "@akasha/pages-system/text-property"

export type KillSwitchPolicy = string

export const killSwitchPolicy = {
  id: "01a0659e-e27e-785d-9144-899178f0736e",
  pageTypeSlug: "text-property",
  slug: "kill-switch-policy",
  propertySlug: "kill-switch-policy",
  definition: "what the make can stop the car doing from outside it",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
