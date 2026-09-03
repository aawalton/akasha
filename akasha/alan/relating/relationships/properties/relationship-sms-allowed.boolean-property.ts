import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type RelationshipSmsAllowed = boolean

export const relationshipSmsAllowed = {
  id: "01a0658a-f4df-7c5f-b3ab-d695da3a32f1",
  pageTypeSlug: "boolean-property",
  slug: "relationship-sms-allowed",
  propertySlug: "relationship-sms-allowed",
  definition: "whether this person may reach Alan by text",
} as const satisfies BooleanProperty
