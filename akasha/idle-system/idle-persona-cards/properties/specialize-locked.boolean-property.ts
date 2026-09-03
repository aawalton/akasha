import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type SpecializeLocked = boolean

export const specializeLocked = {
  id: "01a06596-f0d5-7006-b7ce-ac38a3dd0a68",
  pageTypeSlug: "boolean-property",
  slug: "specialize-locked",
  propertySlug: "specialize-locked",
  definition: "whether a card's specialisation has been settled and shut",
} as const satisfies BooleanProperty
