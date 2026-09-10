import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type RelationshipSmsAllowed = boolean

export const relationshipSmsAllowed = {
  id: "01a06594-c6e2-7d5e-aa8c-cf7e5178c10f",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "relationship-sms-allowed",
  propertySlug: "relationship-sms-allowed",
  definition: "whether this person may reach Alan by text",
} as const satisfies BooleanProperty
