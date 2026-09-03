import type { TextProperty } from "@akasha/pages-system/text-property"

export type KillSwitchPolicy = string

export const killSwitchPolicy = {
  id: "01a06598-aa80-738e-83f4-149b4c759152",
  pageTypeSlug: "text-property",
  slug: "killSwitchPolicy",
  propertySlug: "killSwitchPolicy",
  definition: "what the make can stop the car doing from outside it",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
