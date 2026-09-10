import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type KillSwitchPolicy = string

export const killSwitchPolicy = {
  id: "01a0659e-e27e-785d-9144-899178f0736e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "kill-switch-policy",
  propertySlug: "kill-switch-policy",
  definition: "what the make can stop the car doing from outside it",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
